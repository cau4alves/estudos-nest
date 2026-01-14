import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    async findAll() {
        return await this.taskService.listAllTasks()
    }

    @Get(':id')
    async findOneTask(@Param('id', ParseIntPipe) id: number) {
        return await this.taskService.findOne(id)
    }

    @Post()
    createTask(@Body() body: CreateTaskDTO) {
        return this.taskService.create(body)
    }

    @Patch(':id')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTaskDTO) {
        return this.taskService.update(id, body)
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.delete(id)
    }
}
