import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreatePlanDTO } from "../DTOs/createPlan.dto";
import { CreatePlanUseCase } from "../useCases/createPlan/createPlan.useCase";
import { GetPlanDTO } from "../DTOs/getPlan.dto";
import { GetPlanUseCase } from "../useCases/getPlan/getPlan.useCase";
import { GetUserPlansUseCase } from "../useCases/getUserPlans/getUserPlans.useCase";

@ApiTags('plan')
@Controller('plan')
export class PlanController {
  constructor(
    private readonly createPlanUseCase: CreatePlanUseCase,
    private readonly getPlanUseCase: GetPlanUseCase,
    private readonly getUserPlansUseCase: GetUserPlansUseCase,
  ) {}

  @HttpCode(204)
  @Post('/')
  async create(@Body() body: CreatePlanDTO): Promise<{message:string}> {
    return await this.createPlanUseCase.execute(body);
  }

  @HttpCode(201)
  @Get('/user-plans')
  @ApiQuery({ name: 'userId', type: String, required: true })
  async getUserPlans(@Query() query: Pick<GetPlanDTO, 'userId'>): Promise<any> {
    return await this.getUserPlansUseCase.execute(query);
  }

  @HttpCode(201)
  @Get('/get-plan')
  @ApiQuery({ name: 'planId', type: String, required: true })
  async getPlan(@Query() query: Pick<GetPlanDTO, 'planId'>): Promise<any> {
    return await this.getPlanUseCase.execute(query);
  }
}
