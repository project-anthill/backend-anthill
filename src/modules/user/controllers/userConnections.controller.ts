import { Controller, HttpCode, Post, Query, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequestConnectionUseCase } from "../useCases/requestConnection/requestConnection.useCase";

@ApiTags('UserConnections')
@Controller('user-connections')
export class UserController {
  constructor(private readonly requestConnectionUseCase: RequestConnectionUseCase){}

  @HttpCode(201)
  @Post('request-connection')
  async requestConnection(@Query('userId') userId: string, @Req() req): Promise<any>{
    const token = req.token;
    return this.requestConnectionUseCase.execute(req.token, userId);
  }

  @HttpCode(201)
  @Post('deny-connection')
  async denyConnection(){

  }

  @HttpCode(201)
  @Post('accept-connection')
  async acceptConnection(){

  }
}