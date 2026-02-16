import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.interceptor';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-headers.interceptor';
import { ApiExceptionFilter } from 'src/common/filters/exception-filter';

@Controller('tasks')
// @UseFilters(ApiExceptionFilter)
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    @UseInterceptors(LoggerInterceptor)
    @UseInterceptors(AddHeaderInterceptor)
    async findAll(@Query() paginationDTO: PaginationDTO) {
        return await this.taskService.listAllTasks(paginationDTO)
    }

    @Get(':id')
    async findOneTask(@Param('id', ParseIntPipe) id: number) {
        return await this.taskService.findOne(id)
    }

    @Post()
    @UseInterceptors(BodyCreateTaskInterceptor)
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
