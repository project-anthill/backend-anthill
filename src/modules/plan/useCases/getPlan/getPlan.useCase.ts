import { BadRequestException, Injectable } from '@nestjs/common';
import { PlanService } from '../../services/plan.service';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error.handler';
import { GetPlanDTO } from '../../DTOs/getPlan.dto';
import { GetPlanResponse } from '../../DTOs/getPlanResponse';

@Injectable()
export class GetPlanUseCase {
  constructor(
    private planService: PlanService,
  ) {}
  async execute(request: Pick<GetPlanDTO,'planId'>): Promise<GetPlanResponse> {
    try {
      const plan: GetPlanResponse = await this.planService.getPlan(request);
      if(!plan) throw new BadRequestException("Não foi possível encontrar o plano!");
      if(!plan.isActive) throw new BadRequestException("O plano não existe mais!");

      const decodedString = atob(plan.description);
      plan.description = decodedString;
      return plan;
    } catch (error) {
        PrismaErrorHandler(error);
    }
  }
}
