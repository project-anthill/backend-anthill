import { planCategory as PlanCategory } from '@prisma/client';
import { CreatePlanCategoryDTO } from '../../DTOs/createPlanCategory.dto';
import { GetPlanCategoryDTO } from '../../DTOs/getPlanCategory.dto';

export interface IPlanCategoryService {
    create(request: CreatePlanCategoryDTO): Promise<PlanCategory>;
    getPlanCateories(): Promise<PlanCategory[]>;
    getPlanCategory(request: GetPlanCategoryDTO): Promise<PlanCategory>;
}