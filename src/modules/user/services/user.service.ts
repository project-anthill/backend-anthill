import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/shared/config/prisma.service';
import { IFindUniqueUserRequest } from '../useCases/findUniqueUser/findUniqueUser.interface';
import { RequestConnectionUserDTO } from '../DTOs/requestConnectionUser.dto';
import { UserConnections } from 'src/shared/models/userConnections.model';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(): Promise<user> {
    return this.prisma.user.create({ data: {} });
  }

  async findOne(request: IFindUniqueUserRequest): Promise<user> {
    return this.prisma.user.findUnique({
      where: { id: request.userId },
    });
  }

  async findMany(): Promise<user[]> {
    return this.prisma.user.findMany();
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

  async createRequestConnection(request: RequestConnectionUserDTO): Promise<UserConnections> {
    return this.prisma.userConnections.create({
      data: {
        user: { connect: { id: request.userId } },
        userConnectedId: request.connUserId,
        connectionDate: new Date(),
      },
    });
  }

  async resendRequest(connectionId: string): Promise<any>{
    return this.prisma.userConnections.update({
      where: { id: connectionId},
      data:{
        requestSent: true,
      }
    });
  }

  async findRequest(request: RequestConnectionUserDTO): Promise<UserConnections> {
    return this.prisma.userConnections.findFirst({
      where: {user: {id: request.userId},
      AND: { userConnectedId: request.connUserId}}
    })
  }

  async findUserSentRequests(userId: string): Promise<UserConnections[]> {
    return this.prisma.userConnections.findMany({
      where: { user: { id: userId } },
    });
  }

  async findUserReceivedRequests(userId: string): Promise<UserConnections[]> {
    return this.prisma.userConnections.findMany({
      where: { userConnectedId: userId },
    });
  }

}
