import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {

    constructor(private prisma: PrismaService) {}

    private tasks: Task[] = [
        { id: 1, name: 'Caua', description: 'NestJs', completed: false }
    ]

    async listAllTasks() {
        const allTasks = await this.prisma.task.findMany()
        return allTasks;
    }

    async findOne(id: number) {
        const task = await this.prisma.task.findFirst({
            where: {
                id: id
            }
        })

        if(task?.name) return task

        throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND)
    }

    async create(body: CreateTaskDTO) {
        const newTask = await this.prisma.task.create({
            data: {
                name: body.name,
                description: body.description,
                completed: false
            }
        })   

        return newTask
    }

    async update(id: number, body: UpdateTaskDTO) {
        const findTask = await this.prisma.task.findFirst({
            where: {
                id: id
            }
        })

        if(!findTask) {
            throw new NotFoundException('Tarefa não encontrada')
        }

        const task = await this.prisma.task.update({
            where: { id: id},
            data: body
        })

        return task
    }

    delete(id: number) {
        const taskIndex = this.tasks.findIndex( task => Number(id) === task.id)

        if(taskIndex < 0) {
            throw new NotFoundException('Tarefa não encontrada')
        }

        this.tasks.splice(taskIndex, 1)

        return 'Tarefa deletada com sucesso'
    }
}
