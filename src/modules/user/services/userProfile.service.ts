import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/config/prisma.service';
import { user } from '@prisma/client';
import { CreateUserDTO } from '../DTOs/createUser.dto';
@Injectable()
export class UserProfileService{
    constructor(private prisma: PrismaService){}

    async create(request: CreateUserDTO, userCreated: user) {
        return this.prisma.userProfile.create({
            data: {
                ...request,
                user: { connect: { id: userCreated.id } }
            }
        })
    }
}