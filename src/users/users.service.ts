import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { throwError } from 'rxjs';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(id: number) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                name: true,
                task: true
            }
        })

        if (user) return user

        throw new NotFoundException('Usuário não encontrado')
    }

    async create(body: CreateUserDTO) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    passwordHash: body.password
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })

            return user
        } catch (error) {
            throw new BadRequestException('Falha ao cadastrar usuário')
        }
    }

    async update(id: number, body: UpdateUserDTO) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: id
                }
            })

            if (!user) {
                throw new NotFoundException('Usuário não encontrado')
            }

            const updatedUser = await this.prisma.user.update({
                where: {
                    id: user.id
                }, 
                data: {
                    name: body.name ? body.name : user.name,
                    passwordHash: body.password ? body.password : user.passwordHash
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })

            return updatedUser
        } catch (error) {
            throw new BadRequestException('Falha ao atualizar o usuário')
        }
    }

    async delete(id: number) {
        try {
            const user = await this.prisma.user.findFirst({
                where: { id: id }
            })

            if(!user) {
                throw new NotFoundException('Usuário não encontrado')
            }

            await this.prisma.user.delete({
                where: { id: user.id }
            })

            return {
                message: 'Usuário deletado com sucesso'
            }
        } catch(error) {
            throw new BadRequestException('Falha ao deletar o usuário')
        }
    }
}
