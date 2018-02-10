import * as express from "express";
import * as passport from "passport";
import {Strategy} from "passport-local";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as flash from "express-flash";
import "reflect-metadata";
import {json} from 'body-parser';
import {useExpressServer} from "routing-controllers";
import {createConnection, getCustomRepository} from "typeorm";
import {join} from "path"
import * as md5 from "js-md5";

import {UserRepository} from "./Repository/UserRepository";
import {User} from "./Entity/User";

createConnection().then(async connection => {
    const app = express();

    passport.use(new Strategy(
        async function (username: string, password: string, done: Function) {
            const userRepository = getCustomRepository(UserRepository); // or connection.getCustomRepository or manager.getCustomRepository()
            const user: User = await userRepository.findOne({username});
            if (!user) return done(null, false, {message: 'Invalid username or password.'});
            if (md5(password) === md5(user.password)) return done(null, user);
            return done(null, false, {message: 'Invalid username or password.'});
        }
    ));

    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(session({secret: 'some key'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());


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

    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }), (req, res) => {
            res.redirect('/');
        });

    app.get('/logout',
        function (req, res) {
            req.logout();
            res.redirect('/');
        });


    // Run application
    app.listen(3000, () => console.log(`Server is run on port 3000`));
}).catch(error => console.error(error));
