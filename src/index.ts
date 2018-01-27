import "reflect-metadata";
import {createExpressServer} from "routing-controllers";
import {createConnection} from "typeorm";
import {UserController} from "./Controller/UserController";

createConnection().then(async connection => {
    const app = createExpressServer({
        controllers: [UserController]
    });

    app.listen(3000);
}).catch(error => console.log(error));
