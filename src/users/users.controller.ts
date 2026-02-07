import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get(':id')
    async findOneUser(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.findOne(id)
    }

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        return await this.userService.create(createUserDTO)
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDTO) {
        return await this.userService.update(id, body)
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.delete(id)
    }
}
