import * as express from "express";
import * as passport from "passport";
import { IVerifyOptions, Strategy } from "passport-local";
import * as passportLocal from "passport-local";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as flash from "express-flash";
import "reflect-metadata";
import { json } from 'body-parser';
import { useExpressServer } from "routing-controllers";
import { createConnection, getCustomRepository } from "typeorm";
import { join } from "path"
import { User } from "./Entity/User";

import { UserRepository } from "./Repository/UserRepository";
import * as md5 from "js-md5";
import { Response } from "express";
import { Request } from "express";
import { NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;

createConnection().then(async connection => {
    const app = express();

    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(session({ secret: 'some key' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    passport.serializeUser<any, any>((user, done) => {
        done(undefined, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const userRepository = getCustomRepository(UserRepository);
        try {
            const user = await userRepository.findOneById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });

    passport.use(new LocalStrategy(async (username, password, done) => {
        const userRepository = getCustomRepository(UserRepository); // or connection.getCustomRepository or manager.getCustomRepository()
        const user: User = await userRepository.findOne({ username });
        if (!user) return done(null, false, { message: 'Invalid username or password.' });
        if (md5(password) === md5(user.password)) return done(null, user);
        return done(null, false, { message: 'Invalid username or password.' });
    }));


    /**
     * Login Required middleware.
     */
    let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    };


    app.set('views', join(__dirname + '/Views'));
    app.set('view engine', 'pug');
    app.use(express.static(join(__dirname, "Public")));

    app.use(json());

    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.locals.user = req.user;
        next();
    });

    // Add controllers
    useExpressServer(app, {
        controllers: [__dirname + "/Controller/**/*Controller.ts"]
    });

    app.get('/login', (req, res) => res.render('login', {}));

    app.post('/login', (req: express.Request, res: express.Response, next: express.NextFunction) => {

        passport.authenticate("local", (err: Error, user: User, info: IVerifyOptions) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect("/login");
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect(req.session.returnTo || "/");
            });
        })(req, res, next);
    });

    app.get('/logout',
        function(req, res) {
            req.logout();
            res.redirect('/');
        });

    app.get("/account", isAuthenticated, (req, res) => {
        res.render("profile", {});
    });


    // Run application
    app.listen(3000, () => console.log(`Server is run on port 3000`));
}).catch(error => console.error(error));
