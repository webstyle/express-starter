import * as express from "express";
import "reflect-metadata";
import {createConnection} from "typeorm";

createConnection().then(async connection => {
    const app = express();

    app.listen(3000);
}).catch(error => console.log(error));
