import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/shared/config/prisma.service';
import { IFindUniqueUserRequest } from '../useCases/findUniqueUser/findUniqueUser.interface';
import { IFindManyUserRequest } from '../useCases/findManyUser/findManyUser.interface';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(): Promise<user> {
    return this.prisma.user.create({ data: {} });
  }

  async findOne(request: IFindUniqueUserRequest): Promise<user> {
    return await this.prisma.user.findUnique({
      where: { id: request.userId },
    });
  }
  async findMany(): Promise<user[]> {
    return await this.prisma.user.findMany();
  }
  async deactive(userId: string): Promise<any> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: false,
        deactivatedAt: new Date(),
      },
    });
  }
}
