import { EntityRepository, Repository } from "typeorm";
import {Todo} from "../Entity/Todo";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {

}