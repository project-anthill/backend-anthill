import { BadRequestException, Injectable } from '@nestjs/common';
import { PlanService } from '../../services/plan.service';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error-handler';
import { GetPlanDTO } from '../../DTOs/getPlan.dto';
import { Plan } from 'src/shared/models/plan.model';

@Injectable()
export class GetUserPlansUseCase {
  constructor(
    private planService: PlanService,
  ) {}
  async execute(request: Pick<GetPlanDTO,'userId'>): Promise<Plan[]> {
    try {
      const userPlans = await this.planService.getUserPlans(request);
      if(!userPlans) throw new BadRequestException("Não foi possível encontrar planos do usuário!");
      return userPlans;
    } catch (error) {
        PrismaErrorHandler(error);
    }
  }
}
