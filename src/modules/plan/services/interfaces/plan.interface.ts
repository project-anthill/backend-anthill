import { plan as Plan } from '@prisma/client';
import { CreatePlanDTO } from '../../DTOs/createPlan.dto';
import { GetPlanDTO } from '../../DTOs/getPlan.dto';

export interface IPlanService {
    create(request: CreatePlanDTO): Promise<Plan>;
    getPlan(request: Pick<GetPlanDTO, 'planId'>): Promise<Plan>;
    getUserPlans(request: Pick<GetPlanDTO, 'userId'>): Promise<Plan[]>;
}