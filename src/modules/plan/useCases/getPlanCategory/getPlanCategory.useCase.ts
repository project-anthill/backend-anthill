import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error.handler';
import { PlanCategoryService } from '../../services/planCategory.service';
import { PlanCategory } from 'src/shared/models/planCategory.model';
import { GetPlanCategoryDTO } from '../../DTOs/getPlanCategory.dto';

@Injectable()
export class GetPlanCategoryUseCase {
  constructor(
    private planCategoryervice: PlanCategoryService,
  ) {}
  async execute(request: GetPlanCategoryDTO): Promise<PlanCategory> {
    try {
      const getPlanCateory = await this.planCategoryervice.getPlanCategory(request);
      if(!getPlanCateory) throw new BadRequestException("Não encontramos a categoria");
      return getPlanCateory;
    } catch (error) {
        PrismaErrorHandler(error);
    }
  }
}
