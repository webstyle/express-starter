import { Controller, Get, Render } from "routing-controllers";

@Controller()
export class IndexController {

    @Get("/")
    @Render("index")
    async index(): Promise<Object> {
        return {};
    }

    @Get("/features")
    @Render("pages/features")
    async features(): Promise<Object> {
        return {};
    }

}