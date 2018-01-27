import {Controller, Param, Body, Get, Post, Put, Delete} from "routing-controllers";
import {User} from "../Entity/User";

@Controller("/users")
export class UserController {

    @Get("/")
    async getAll(): Promise<string> {
        return "This action returns all user";
    }

    @Get("/:id")
    async getOne(@Param("id") id: number): Promise<string> {
        return "This action returns user #" + id;
    }

    @Post("/")
    async post(@Body() user: User): Promise<string> {
        return "Saving user...";
    }

}