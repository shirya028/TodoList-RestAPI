import { Controller, Get, Post, Delete, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGaurd } from '../user/gaurds/jwt.gaurd';
import { CustomRequest } from '../user/custom-request.interface';

@Controller('todolist')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    @UseGuards(JwtAuthGaurd)
    getTodos(@Req() req: CustomRequest) {
        return this.todoService.getTodos(req.user.id);
    }

    @Get('/:id')
    getTodo(@Param('id') id: string) {
        return this.todoService.getTodo(id);
    }

    @Post()
    @UseGuards(JwtAuthGaurd)
    addTodo(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('dueDate') dueDate: string,
        @Body('currentState') currentState: string,
        @Req() req: CustomRequest
    ) {
        const userId = req.user.id;
        return this.todoService.addTodo(title, description, dueDate, currentState, userId);
    }

    @Put('/:id')
    @UseGuards(JwtAuthGaurd)
    updateTodo(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('dueDate') dueDate: string,
        @Body('currentState') currentState: string
    ) {
        return this.todoService.updateTodo(id, title, description, dueDate, currentState);
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGaurd)
    deleteTodo(@Param('id') id: string) {
        return this.todoService.deleteTodo(id);
    }
}
