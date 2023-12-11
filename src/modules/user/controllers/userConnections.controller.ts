import { Body, Controller, Get, HttpCode, Post, Query, Req } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { RequestConnectionUseCase } from "../useCases/requestConnection/requestConnection.useCase";
import { RequestConnectionUserDTO } from "../DTOs/requestConnectionUser.dto";
import { FindUserSentRequestsUseCase } from "../useCases/findUserSentRequests/findUserSentRequests.useCase";
import { FindUserReceivedRequestsUseCase } from "../useCases/findUserReceivedRequests/findeUserReceivedRequests.useCase";
import { ResponseHandler } from "src/shared/utils/response.handler";
import { UserConnections } from "src/shared/models/userConnections.model";

@ApiTags('User connections')
@Controller('user-connections')
export class UserConnectionsController {
  constructor(
    private readonly requestConnectionUseCase: RequestConnectionUseCase,
    private readonly findUserSentRequestsUseCase: FindUserSentRequestsUseCase,
    private readonly findUserReceivedRequestsUseCase: FindUserReceivedRequestsUseCase,
  ){}

  @HttpCode(201)
  @Post('request-connection')
  async requestConnection(@Body() request: RequestConnectionUserDTO): Promise<{message:String, status:String}>{
    return this.requestConnectionUseCase.execute(request);
  }

  @HttpCode(200)
  @Get('req-sent')
  @ApiQuery({ name: 'userId', type: String, required: true })
  async findUserSentRequests(@Query('userId') userId: string): Promise<ResponseHandler & {connections: UserConnections[]}>{
    return this.findUserSentRequestsUseCase.execute(userId);
  }

  @HttpCode(200)
  @Get('req-received')
  @ApiQuery({ name: 'userId', type: String, required: true })
  async findUserReceivedRequests(@Query('userId') userId: string): Promise<ResponseHandler & {connections: UserConnections[]}>{
    return this.findUserReceivedRequestsUseCase.execute(userId);
  }

  @HttpCode(201)
  @Post('deny-requisition')
  async denyRequisition(){

  }

  @HttpCode(201)
  @Post('accept-requisition')
  async acceptRequisition(){

  }

  @HttpCode(201)
  @Post('cancel-connection')
  async cancelConnection(){

  }
}