import { plan as Plan } from '@prisma/client';
import { CreatePlanDTO } from '../../DTOs/plan.dto';

export interface IPlanService {
    create(request: CreatePlanDTO): Promise<Plan>;

}