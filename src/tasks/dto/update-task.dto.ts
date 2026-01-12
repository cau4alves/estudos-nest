import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsOptional, IsString } from "class-validator"
import { CreateTaskDTO } from "./create-task.dto";

// export class UpdateTaskDTO {
//     @IsString()
//     @IsOptional()
//     readonly name?: string

//     @IsString()
//     @IsOptional()
//     readonly description?: string

//     @IsBoolean()
//     @IsOptional()
//     readonly completed?: boolean
// }

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {

    @IsBoolean()
    @IsOptional()
    readonly completed?: boolean
}