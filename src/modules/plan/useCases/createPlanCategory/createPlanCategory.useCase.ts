import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error-handler';
import { CreatePlanCategoryDTO } from '../../DTOs/createPlanCategory.dto';
import { PlanCategoryService } from '../../services/planCategory.service';

@Injectable()
export class CreatePlanCategoryUseCase {
  constructor(
    private planCategoryervice: PlanCategoryService,
  ) {}
  async execute(request: CreatePlanCategoryDTO): Promise<{message:string}> {
    try {
      const createdPlanCategory = await this.planCategoryervice.create(request);
      if(!createdPlanCategory) throw new BadRequestException("Não foi possível criar categoria de plano!");
      return { message: 'success'};
    } catch (error) {
        PrismaErrorHandler(error);
    }
  }
}
