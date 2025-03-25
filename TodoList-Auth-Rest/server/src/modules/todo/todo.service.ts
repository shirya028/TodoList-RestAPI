import { Injectable } from '@nestjs/common';
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>
    ) {}

    async getTodos(id : number) {
        return await this.todoRepository.findBy({userId : id});
    }

    async getTodo(id: string) {
        return await this.todoRepository.findOneBy({ id });
    }

    async addTodo(title: string, description: string, dueDate: string, currentState: string, userId: number) {
        const todo = new TodoEntity();
        todo.id = `${Date.now()}`; 
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;
        todo.currentState = currentState;
        todo.userId = userId;

        await this.todoRepository.save(todo);
        return todo;
    }

    async updateTodo(id: string, title: string, description: string, dueDate: string, currentState: string) {
        const todo = await this.todoRepository.findOneBy({ id });
        if (!todo) {
            return {'message' : 'Todo not found'}; 
        }

        todo.title = title ?? todo.title;
        todo.description = description ?? todo.description;
        todo.dueDate = dueDate ?? todo.dueDate;
        todo.currentState = currentState ?? todo.currentState;

        await this.todoRepository.save(todo);
        return todo;
    }

    async deleteTodo(id: string) {
        const todo = await this.todoRepository.findOneBy({ id });
        if (!todo) {
           return {'message' : 'Todo not found'};
        }

        await this.todoRepository.remove(todo);
        return 'Todo deleted successfully';
    }
}
