import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/shared/config/prisma.service';
import { IFindUniqueUserRequest } from '../useCases/findUnique/findUniqueUser.interface';
import { IFindManyUserRequest } from '../useCases/findMany/findManyUser.interface';
@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}

    async create(): Promise<user> {
        return this.prisma.user.create({data:{}})
    }

    async findOne(request: IFindUniqueUserRequest): Promise<user> {
        return await this.prisma.user.findUnique({
            where: { id: request.userId },
        });
    }
}