import { BadRequestException, Injectable } from '@nestjs/common';
import { PlanService } from '../../services/plan.service';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error.handler';
import { GetPlanDTO } from '../../DTOs/getPlan.dto';
import { Plan } from 'src/shared/models/plan.model';
import { GetPlanResponse } from '../../DTOs/getPlanResponse';

@Injectable()
export class GetUserPlansUseCase {
  constructor(
    private planService: PlanService,
  ) {}
  async execute(request: Pick<GetPlanDTO,'userId'>): Promise<GetPlanResponse[]> {
    try {
      const userPlans = await this.planService.getUserPlans(request);
      if(!userPlans) throw new BadRequestException("Não foi possível encontrar planos do usuário!");

      const usersPlansActive = (userPlans.filter(
        (plan) => plan.isActive,
      ));
      if(!usersPlansActive) throw new BadRequestException("Não foi possível encontrar planos do usuário ativos!");

      return usersPlansActive;
    } catch (error) {
        PrismaErrorHandler(error);
    }
  }
}
