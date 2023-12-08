import { BadRequestException, Injectable } from '@nestjs/common';
import { PlanService } from '../../services/plan.service';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error-handler';
import { GetPlanDTO } from '../../DTOs/getPlan.dto';
import { Plan } from 'src/shared/models/plan.model';

@Injectable()
export class GetPlanUseCase {
  constructor(
    private planService: PlanService,
  ) {}
  async execute(request: Pick<GetPlanDTO,'planId'>): Promise<any> {
    try {
      const plan = await this.planService.getPlan(request);
      if(!plan) throw new BadRequestException("Não foi possível encontrar o plano!");
      return plan;
    } catch (error) {
        PrismaErrorHandler(error);
    }
  }
}
