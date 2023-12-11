import { BadRequestException, Injectable } from '@nestjs/common';
import { PlanService } from '../../services/plan.service';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error.handler';
import { GetPlanDTO } from '../../DTOs/getPlan.dto';
import { GetPlanResponse } from '../../DTOs/getPlanResponse';

@Injectable()
export class GetAllPlansUseCase {
  constructor(
    private planService: PlanService,
  ) {}
  async execute(): Promise<GetPlanResponse[]> {
    try {
      const plans: GetPlanResponse[] = await this.planService.getAllPlans();
      if(!plans) throw new BadRequestException("Não foi possível encontrar algum plano!");

      const activePlans: GetPlanResponse[] = plans.filter((plan) => plan.isActive);

      activePlans.map((plan) => {
        const decodedString = atob(plan.description);
        plan.description = decodedString;
      });
      return activePlans;
    } catch (error) {
        PrismaErrorHandler(error);
    }
  }
}
