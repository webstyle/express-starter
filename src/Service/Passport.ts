import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as _ from "lodash";
import * as md5 from "js-md5";
import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";

import { User } from "../Entity/User";
import { UserRepository } from "../Repository/UserRepository";


const LocalStrategy = passportLocal.Strategy;


/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.path.split("/").slice(-1)[0];

    if (_.find(req.user.tokens, { kind: provider })) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};