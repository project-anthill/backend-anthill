import { ApiProperty } from '@nestjs/swagger';
import { PlanCategory } from 'src/shared/models/planCategory.model';

export class CreatePlanCategoryDTO {
  @ApiProperty({
    example: 'plan-category-name',
  })
  name: PlanCategory['name'];

  @ApiProperty({
    example: 'description',
  })
  description: PlanCategory['description'];

  @ApiProperty({
    example: 'user-id',
  })
  updatedBy: PlanCategory['updatedBy'];
}