import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
        try {
            const newTask = await this.prisma.task.create({
                data: {
                    name: body.name,
                    description: body.description,
                    completed: false,
                    userId: body.userId
                }
            })   

            return newTask
        } catch(error) {
            throw new BadRequestException('Falha ao cadastrar tarefa')
        }
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
            data: {
                name: body?.name ? body.name : findTask.name,
                description: body?.description ? body.description : findTask.description,
                completed: body?.completed ? body.completed : findTask.completed
            }
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
