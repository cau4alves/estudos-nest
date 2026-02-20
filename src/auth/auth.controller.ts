import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/signIn.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post()
    async signIn(@Body() body: SignInDTO) {
        return await this.authService.authenticate(body)
    }
}
