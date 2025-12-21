import { IsBoolean, IsOptional, IsString } from "class-validator"

export class UpdateTaskDTO {
    @IsString()
    @IsOptional()
    readonly name?: string

    @IsString()
    @IsOptional()
    readonly description?: string

    @IsBoolean()
    @IsOptional()
    readonly completed?: boolean
}