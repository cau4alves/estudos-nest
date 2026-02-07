import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class CreateTaskDTO {
    @IsString({ message: 'Has to be a String' })
    @MinLength(5)
    @IsNotEmpty()
    readonly name: string

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    readonly description: string

    @IsNumber()
    @IsNotEmpty()
    readonly userId: number
}