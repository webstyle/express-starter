import { Controller, Param, Body, Get, Post, Render } from "routing-controllers";
import { User } from "../Entity/User";
import { UserRepository } from "../Repository/UserRepository";
import { getCustomRepository } from "typeorm";

@Controller("/users")
export class UserController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    @Get("/")
    async getAll(): Promise<User[]> {
        return await this.userRepository.find({});
    }

    @Get("/:id")
    async getOne( @Param("id") id: number): Promise<string> {
        return "This action returns user #" + id;
    }

    @Post("/")
    async post( @Body() user: User): Promise<string> {
        console.log(user);
        return "Saving user...";
    }

}