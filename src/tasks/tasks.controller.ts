import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    findAll() {
        return this.taskService.listAllTasks()
    }

    @Get(':id')
    findOneTask(@Param('id') id: string) {
        return this.taskService.findOne(id)
    }

    @Post()
    createTask(@Body() body: Task) {
        console.log(body)

        return this.taskService.create(body)
    }

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() body: any) {
        console.log(id)
        console.log(body)

        return 'Atualizando tarefa'
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        console.log('Id enviado' + id)

        return 'Tarefa deletada'
    }
}
