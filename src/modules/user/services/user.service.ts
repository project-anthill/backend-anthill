import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/config/prisma.service';
import { Prisma, user } from '@prisma/client';
@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}

    async create(data: Prisma.userCreateInput) {
        return this.prisma.user.create({
            data,
        })
    }
}