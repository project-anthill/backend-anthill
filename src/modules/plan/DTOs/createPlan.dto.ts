import { ApiProperty } from '@nestjs/swagger';
import { Plan } from '../../../shared/models/plan.model';

export class CreatePlanDTO {
  @ApiProperty({
    example: 'userId',
  })
  userId: Plan['userId'];

  @ApiProperty({
    example: 'plan title',
  })
  title: Plan['title'];

  @ApiProperty({
    example: 'resume',
  })
  resume: Plan['resume'];

  @ApiProperty({
    example: 'description',
  })
  description: Plan['description'];

  @ApiProperty({
    enum: ['concept', 'prototype', 'tutorial'],
  })
  planStage: Plan['planStage'];

  @ApiProperty({
    example: 'bannerImageUrl',
  })
  bannerImageUrl?: Plan['bannerImageUrl'];

  @ApiProperty({
    example: 'iconImageUrl',
  })
  iconImageUrl?: Plan['iconImageUrl'];
}