import { plan as Plan, planHasCategories as PlanHasCategories } from '@prisma/client';
import { CreatePlanDTO } from '../../DTOs/createPlan.dto';
import { GetPlanDTO } from '../../DTOs/getPlan.dto';

export interface IPlanService {
    create(request: CreatePlanDTO): Promise<Plan>;
    getPlan(request: Pick<GetPlanDTO, 'planId'>): Promise<any>;
    getUserPlans(request: Pick<GetPlanDTO, 'userId'>): Promise<Plan[]>;
    addCategoriesToPlan(planId: string, categoryId: string): Promise<PlanHasCategories>;
}