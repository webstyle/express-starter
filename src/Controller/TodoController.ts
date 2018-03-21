import {Body, Controller, Get, Param, Post, Redirect, Render} from "routing-controllers";
import {getCustomRepository} from "typeorm";
import {TodoRepository} from "../Repository/TodoRepository";
import * as moment from "moment";
import {Todo} from "../Entity/Todo";


@Controller("/todo")
export class TodoController {
    private todoRepository: TodoRepository;

    constructor() {
        this.todoRepository = getCustomRepository(TodoRepository);
    }

    @Get("/")
    @Render("todo/list")
    async getAll(): Promise<Object> {
        return {
            moment,
            list: await this.todoRepository.find({})
        };
    }

    @Get("/:id")
    async getOne( @Param("id") id: number): Promise<string> {
        return "This action returns user #" + id;
    }

    @Post("/")
    @Redirect("/todo")
    async post( @Body() input: Todo): Promise<any> {
        console.log(input);
        return await this.todoRepository.save([new Todo(input.text, false, new Date(), new Date())]);
    }

}