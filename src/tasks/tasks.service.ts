import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [
        { id: 1, name: 'Caua', description: 'NestJs', completed: false }
    ]

    listAllTasks() {
        return this.tasks;
    }

    findOne(id: number) {
        const task = this.tasks.find( task => task.id === id)

        if(task) return task

        // throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND)

        throw new NotFoundException('Essa tarefa não existe')
    }

    create(body: CreateTaskDTO) {
        const newId = this.tasks.length + 1

        const newTask = {
            id: newId,
            ...body,
            completed: false
        }

        this.tasks.push(newTask)

        return newTask
    }

    update(id: number, body: UpdateTaskDTO) {
        const taskIndex = this.tasks.findIndex( task => task.id === Number(id))

        if(taskIndex === -1) {
            throw new NotFoundException('Tarefa não encontrada')
        }

        if(taskIndex >= 0) {
            const taskItem = this.tasks[taskIndex]

            this.tasks[taskIndex] = {
                ...taskItem,
                ...body,
            }
        }

        return this.tasks[taskIndex]
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
