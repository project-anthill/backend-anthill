import { Body, Controller, Get, HttpCode, Post, Query, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreatePlanDTO } from "../DTOs/createPlan.dto";
import { CreatePlanUseCase } from "../useCases/createPlan/createPlan.useCase";
import { GetPlanDTO } from "../DTOs/getPlan.dto";
import { GetPlanUseCase } from "../useCases/getPlan/getPlan.useCase";
import { GetUserPlansUseCase } from "../useCases/getUserPlans/getUserPlans.useCase";
import { AddCategoriesToPlanUseCase } from "../useCases/addCategoriesToPlan/addCategoriesToPlan.useCase";
import { AddCategoriesToPlanDTO } from "../DTOs/addCategoriesToPlan.dto";
import { JoiValidationPipe } from "src/shared/utils/joi/joi-validation-pipe";
import { AddCategoriesToPlanSchema } from "../useCases/addCategoriesToPlan/addCategoriesToPlanSchema.validator";
import { Plan } from "src/shared/models/plan.model";
import { GetPlanResponse } from "../DTOs/getPlanResponse";
import { GetAllPlansUseCase } from "../useCases/getAllPlans/getAllPlans.useCase";

@ApiTags('Plan')
@Controller('plan')
export class PlanController {
  constructor(
    private readonly createPlanUseCase: CreatePlanUseCase,
    private readonly getPlanUseCase: GetPlanUseCase,
    private readonly getAllPlansUseCase: GetAllPlansUseCase,
    private readonly getUserPlansUseCase: GetUserPlansUseCase,
    private readonly addCategoriesToPlanUseCase: AddCategoriesToPlanUseCase,
  ) {}

  @HttpCode(201)
  @Post('/')
  @ApiOperation({
    summary: 'Create a new plan',
    description: 'Endpoint to create a new plan with the provided data.',
  })
  async create(@Body() body: CreatePlanDTO): Promise<Plan> {
    return await this.createPlanUseCase.execute(body);
  }

  @HttpCode(201)
  @Get('/user-plans')
  @ApiQuery({ name: 'userId', type: String, required: true })
  @ApiOperation({
    summary: 'Get only plans created by a user',
    description: 'Endpoint to request plans created by the USER ID',
  })
  async getUserPlans(@Query() query: Pick<GetPlanDTO, 'userId'>): Promise<any> {
    return await this.getUserPlansUseCase.execute(query);
  }

  @HttpCode(201)
  @Get('/get-plan')
  @ApiQuery({ name: 'planId', type: String, required: true })
  @ApiOperation({
    summary: 'Get plan',
    description: 'Endpoint to request a especific plan by PLAN ID',
  })
  async getPlan(@Query() query: Pick<GetPlanDTO, 'planId'>): Promise<any> {
    return await this.getPlanUseCase.execute(query);
  }

  @HttpCode(201)
  @Get('/')
  @ApiOperation({
    summary: 'Get all plans',
    description: 'Endpoint to request a list of every plan on base',
  })
  async getAllPlans(): Promise<GetPlanResponse[]> {
    return await this.getAllPlansUseCase.execute();
  }

  @HttpCode(204)
  @Post('/add-categories-to-plan')
  @UsePipes(new JoiValidationPipe(AddCategoriesToPlanSchema))
  @ApiOperation({
    summary: 'Add categories to a plan',
    description: 'Endpoint to add categories to a plan, limited to 5 categories. <br/> Send categoriesList like this <b> "categoriesList": ["idCategory1","idCategory2","idCategory3","idCategory4","idCategory5"] </b>',
  })
  async addCategoriesToPlan(@Body() body: AddCategoriesToPlanDTO): Promise<{message:string}> {
    return await this.addCategoriesToPlanUseCase.execute(body);
  }


}
