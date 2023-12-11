import { Injectable} from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error.handler';
import { ResponseHandler } from 'src/shared/utils/response.handler';
import { UserConnections } from 'src/shared/models/userConnections.model';
import { PrismaClient } from '@prisma/client';
import { isEmpty } from 'rxjs';

@Injectable()
export class FindUserReceivedRequestsUseCase {
  constructor(
    private userService: UserService,
  ) {}

  async execute(userId: string): Promise<ResponseHandler & {connections: UserConnections[]}> {
    try {
      const response = await this.userService.findUserReceivedRequests(userId);
      console.log(response)
      if(response.length === 0)
        return {
          message: 'You did not received any requests',
          status: '200',
          connections:[]
        }

      return {
        message: 'success',
        status: '200',
        connections: {...response}
      };
    } catch (error) {
      if(error instanceof PrismaClient) PrismaErrorHandler(error);
    }
  }
}
