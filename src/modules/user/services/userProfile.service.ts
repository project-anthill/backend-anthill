import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/config/prisma.service';
import { user, userProfile } from '@prisma/client';
import { ICreateUserRequest } from '../useCases/create/createUser.interface';
import { IFindUniqueUserRequest } from '../useCases/findUnique/findUniqueUser.interface';
import { IFindManyUserRequest } from '../useCases/findMany/findManyUser.interface';
@Injectable()
export class UserProfileService{
    constructor(private prisma: PrismaService){}
    async create(request: ICreateUserRequest, userCreated: user){
        await this.prisma.userProfile.create({
            data: {
                ...request,
                user: { connect: { id: userCreated.id } }
            }
        })
    }

    async findOne(request: IFindUniqueUserRequest): Promise<userProfile> {
        if(request.userId){
            return await this.prisma.userProfile.findUnique({
                where: { userId: request.userId },
            });
        }
        if(request.username){
            return await this.prisma.userProfile.findUnique({
                where: { username: request.username },
            });
        }
        if(request.email){
            return await this.prisma.userProfile.findUnique({
                where: { email: request.email },
            });
        }
        if(request.phone){
            return await this.prisma.userProfile.findFirst({
                where: { phone: request.phone },
            });
        }
    }

    async findMany(request: IFindManyUserRequest): Promise<userProfile[]> {
        if(request.birthDate){
            const formattedDate = request.birthDate.toISOString();
            return await this.prisma.userProfile.findMany({
                where: { birthDate: formattedDate },
            });
        }
        if(request.gender){
            return await this.prisma.userProfile.findMany({
                where: { gender: request.gender },
            });
        }
        if(!request.gender && !request.birthDate){
            return await this.prisma.userProfile.findMany();
        }
    }
}