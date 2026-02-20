import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInDTO {

    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string
}