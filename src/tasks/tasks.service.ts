import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {

    constructor(private prisma: PrismaService) {}

    async listAllTasks(paginationDTO?: PaginationDTO) {
        const { limit = 10, offset = 0} = paginationDTO ?? {};

        const allTasks = await this.prisma.task.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                createdAt: 'desc'
            }
        })
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

    async delete(id: number) {
        const findTask = await this.prisma.task.findFirst({
            where: {
                id: id
            }
        })

        if(!findTask) {
            throw new NotFoundException('Tarefa não encontrada')
        }

        await this.prisma.task.delete({
            where: {
                id: id
            }
        })

        return 'Tarefa deletada com sucesso'
    }
}
