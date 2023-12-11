import { BadRequestException, Injectable } from '@nestjs/common';
import { PlanService } from '../../services/plan.service';
import { PrismaErrorHandler } from 'src/shared/utils/prisma-error.handler';
import { AddCategoriesToPlanDTO } from '../../DTOs/addCategoriesToPlan.dto';

@Injectable()
export class AddCategoriesToPlanUseCase {
  constructor(
    private planService: PlanService,
  ) {}
  async execute(request: AddCategoriesToPlanDTO): Promise<{message:string}> {
    try {

        const categoriesAdded = request.categoriesList.map(async (category) =>{
            const categoryAdded = await this.planService.addCategoriesToPlan(request.planId, category);
            if(!categoryAdded) throw new BadRequestException("Não foi possível adicionar categoria(s) ao plano!");
        });
        if(!categoriesAdded) throw new BadRequestException("Algo deu errado ao adicionar as categorias ao plano!");
        return { message: 'success'};
    } catch (error) {
        PrismaErrorHandler(error);
    }
  }
}
