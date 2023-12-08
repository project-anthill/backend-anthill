import { ApiProperty } from '@nestjs/swagger';
import { PlanCategory } from '../../../shared/models/planCategory.model';

export class GetPlanCategoryDTO {
  @ApiProperty({
  example: 'plan-category-id',
  })
  planCategoryId: PlanCategory['id'];
}