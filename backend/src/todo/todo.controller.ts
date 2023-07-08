import { Controller, Param, UseGuards, Body, ParseIntPipe, Get, Post, Patch, Delete } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";
import { TodoDTO } from "src/Common/DTO/todo.dto";


@Controller('todo')
export class TodoController {
    constructor(private todoService:TodoService){}
    @UseGuards(JwtAuthGuard)
    @Get("/:userId")
    GetTodo(@Param('userId', ParseIntPipe)  userId: number  ){
        return this.todoService.getTodo(userId);
    }

   
    @UseGuards(JwtAuthGuard)
    @Post("/")
    AddTodo(@Body() todoData: TodoDTO){
        return this.todoService.addTodo(todoData);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/:todoId")
    UpdateTodo(@Param('todoId', ParseIntPipe) todoId: number ,@Body() uTodoData: TodoDTO){
        return this.todoService.updateTodo(todoId ,uTodoData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:todoId")
    DeleteTodo(@Param('todoId', ParseIntPipe) todoId: number){
        return this.todoService.deleteTodo(todoId);
    }
}