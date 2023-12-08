import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
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
  async create(@Body() body: CreatePlanCategoryDTO): Promise<{message:string}> {
    return await this.createPlanCategoryUseCase.execute(body);
  }

  @HttpCode(201)
  @Get('/')
  async getPlanCateories(): Promise<any> {
    return await this.getPlanCategoriesUseCase.execute();
  }

  @HttpCode(201)
  @Get('/:planCategoryId')
  @ApiQuery({ name: 'planCategoryId', type: String, required: true })
  async getPlanCategory(@Query() planCategoryId: GetPlanCategoryDTO): Promise<any> {
    return await this.getPlanCategoryUseCase.execute(planCategoryId);
  }
}
