import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePlanDTO } from "../DTOs/plan.dto";
import { CreatePlanUseCase } from "../useCases/createPlan/createPlan.useCase";

@ApiTags('plan')
@Controller('plan')
export class PlanController {
  constructor(
    private readonly createPlanUseCase: CreatePlanUseCase,
  ) {}

  @HttpCode(201)
  @Post('/')
  async create(@Body() body: CreatePlanDTO): Promise<{message:string}> {
    return await this.createPlanUseCase.execute(body);
  }
}
