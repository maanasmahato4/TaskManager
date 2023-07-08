import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoDTO } from "src/Common/DTO/todo.dto";
import { Todo } from "src/Common/Entity/todo.entity";
import { Repository } from "typeorm";

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepo: Repository<Todo>
    ) { }
    getTodo(userId: number) {
        return this.todoRepo.find({ where: { userId: userId } })
    }

    addTodo(todoData: TodoDTO) {
        return this.todoRepo.save(todoData);
    }

    updateTodo(todoId: number, uTodoData: TodoDTO) {
        return this.todoRepo.update(todoId, uTodoData);
    }

    deleteTodo(todoId: number) {
        return this.todoRepo.delete(todoId);
    }
}