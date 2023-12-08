import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreatePlanCategoryDTO } from "../DTOs/createPlanCategory.dto";
import { CreatePlanCategoryUseCase } from "../useCases/createPlanCategory/createPlanCategory.useCase";
import { GetPlanCategoriesUseCase } from "../useCases/getPlanCategories/getPlanCategories.useCase";
import { GetPlanCategoryUseCase } from "../useCases/getPlanCategory/getPlanCategory.useCase";
import { GetPlanCategoryDTO } from "../DTOs/getPlanCategory.dto";

@ApiTags('Plan category')
@Controller('plan-category')
export class PlanCategoryController {
  constructor(
    private readonly createPlanCategoryUseCase: CreatePlanCategoryUseCase,
    private readonly getPlanCategoriesUseCase: GetPlanCategoriesUseCase,
    private readonly getPlanCategoryUseCase: GetPlanCategoryUseCase,
    
  ) {}

  @HttpCode(204)
  @Post('/')
  @ApiOperation({
    summary: 'Create a category of plans',
    description: 'Endpoint to create a CATEGORY to plans (Not to add category to a plan). You need to pass the user that created on updatedBy field',
  })
  async create(@Body() body: CreatePlanCategoryDTO): Promise<{message:string}> {
    return await this.createPlanCategoryUseCase.execute(body);
  }

  @HttpCode(201)
  @Get('/')
  @ApiOperation({
    summary: 'Get all categories',
    description: 'Endpoint to request every category active',
  })
  async getPlanCateories(): Promise<any> {
    return await this.getPlanCategoriesUseCase.execute();
  }

  @HttpCode(201)
  @Get('/:planCategoryId')
  @ApiQuery({ name: 'planCategoryId', type: String, required: true })
  @ApiOperation({
    summary: 'Get a especific plan category ',
    description: 'Endpoint to get a especific plan category by his ID',
  })
  async getPlanCategory(@Query() planCategoryId: GetPlanCategoryDTO): Promise<any> {
    return await this.getPlanCategoryUseCase.execute(planCategoryId);
  }
}
