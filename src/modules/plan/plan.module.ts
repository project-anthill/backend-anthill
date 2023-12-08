import { Module } from '@nestjs/common';
import { PlanController } from './controllers/plan.controller';
import { CreatePlanUseCase } from './useCases/createPlan/createPlan.useCase';
import { PlanService } from './services/plan.service';
import { PrismaService } from 'src/shared/config/prisma.service';
import { GetPlanUseCase } from './useCases/getPlan/getPlan.useCase';
import { GetUserPlansUseCase } from './useCases/getUserPlans/getUserPlans.useCase';
import { GetPlanCategoriesUseCase } from './useCases/getPlanCategories/getPlanCategories.useCase';
import { GetPlanCategoryUseCase } from './useCases/getPlanCategory/getPlanCategory.useCase';
import { CreatePlanCategoryDTO } from './DTOs/createPlanCategory.dto';
import { PlanCategoryService } from './services/planCategory.service';
import { PlanCategoryController } from './controllers/planCategory.controller';
import { CreatePlanCategoryUseCase } from './useCases/createPlanCategory/createPlanCategory.useCase';
import { AddCategoriesToPlanUseCase } from './useCases/addCategoriesToPlan/addCategoriesToPlan.useCase';

@Module({
  imports: [],
  controllers: [PlanController, PlanCategoryController],
  providers: [
    CreatePlanUseCase,
    GetPlanUseCase,
    GetUserPlansUseCase,
    GetPlanCategoriesUseCase,
    GetPlanCategoryUseCase,
    CreatePlanCategoryUseCase,
    AddCategoriesToPlanUseCase,
    PlanCategoryService,
    PlanService,
    PrismaService
  ],
})
export class PlanModule {}
