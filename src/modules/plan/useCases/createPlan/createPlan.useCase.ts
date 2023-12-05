import { BadRequestException, Injectable } from '@nestjs/common';
import { PlanService } from '../../services/plan.service';
import { CreatePlanDTO } from '../../DTOs/plan.dto';
import { Plan } from 'src/shared/models/plan.model';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error-handler';

@Injectable()
export class CreatePlanUseCase {
  constructor(
    private planService: PlanService,
  ) {}
  async execute(request: CreatePlanDTO): Promise<any> {
    try {
      const createdUser = await this.planService.create(request);
      if(!createdUser) throw new BadRequestException("Não foi possível criar plano!");
      return { message: 'success'};
    } catch (error) {
        PrismaErrorHandler(error);
    }
  }
}