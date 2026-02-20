import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from './dto/signIn.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private readonly hashingService: HashingServiceProtocol
    ) {}

    async authenticate(body: SignInDTO) {
        
        const user =  await this.prisma.user.findFirst({
            where: {
                email: body.email
            }
        })

        if(!user) {
            throw new UnauthorizedException('Usuário inválido')
        }

        const passwordIsValid = await this.hashingService.compare(body.password, user.passwordHash)

        if(!passwordIsValid) {
            throw new UnauthorizedException('Usuário inválido')
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name
        }
    }
}
