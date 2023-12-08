import { ApiProperty } from '@nestjs/swagger';
import { Plan } from 'src/shared/models/plan.model';
import { PlanCategory } from 'src/shared/models/planCategory.model';

export class AddCategoriesToPlanDTO {
  @ApiProperty({
    example: 'plan-id',
  })
  planId: Plan['id'];

  @ApiProperty({
    example: 'category-id',
    type: [String],
    isArray: true,
    maxLength: 5,
  })
  categoriesList?: PlanCategory['id'][];
}