import { BadRequestException, Injectable } from '@nestjs/common';
import { PlanService } from '../../services/plan.service';
import { CreatePlanDTO } from '../../DTOs/createPlan.dto';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error.handler';
import { Plan } from 'src/shared/models/plan.model';

@Injectable()
export class CreatePlanUseCase {
  constructor(
    private planService: PlanService,
  ) {}
  async execute(request: CreatePlanDTO): Promise<Plan> {
    try {
      const encoded = btoa(JSON.stringify(request.description))
      request.description = encoded;
      const createdPlan = await this.planService.create(request);
      if(!createdPlan) throw new BadRequestException("Não foi possível criar plano!");
      return createdPlan;
    } catch (error) {
        PrismaErrorHandler(error);
    }
  }
}
