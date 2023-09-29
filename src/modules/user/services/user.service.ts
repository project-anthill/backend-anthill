import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/shared/config/prisma.service';
@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}

    async create(): Promise<user> {
        return this.prisma.user.create({data:{}})
    }
}