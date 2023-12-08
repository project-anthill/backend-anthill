import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error-handler';
import { PlanCategoryService } from '../../services/planCategory.service';
import { PlanCategory } from 'src/shared/models/planCategory.model';

@Injectable()
export class GetPlanCategoriesUseCase {
  constructor(
    private planCategoryervice: PlanCategoryService,
  ) {}
  async execute(): Promise<PlanCategory[]> {
    try {
      const getPlanCateories = await this.planCategoryervice.getPlanCateories();
      if(!getPlanCateories) throw new BadRequestException("Não encontramos categorias para planos");
      return getPlanCateories;
    } catch (error) {
        PrismaErrorHandler(error);
    }
  }
}
