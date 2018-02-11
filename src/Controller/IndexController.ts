import { Controller, Get, Render } from "routing-controllers";

@Controller()
export class IndexController {

    @Get("/")
    @Render("index")
    async index(): Promise<Object> {
        return {};
    }

}