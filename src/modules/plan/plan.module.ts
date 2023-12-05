import { Module } from '@nestjs/common';
import { PlanController } from './controllers/plan.controller';
import { CreatePlanUseCase } from './useCases/createPlan/createPlan.useCase';
import { PlanService } from './services/plan.service';
import { PrismaService } from 'src/shared/config/prisma.service';
import { GetPlanUseCase } from './useCases/getPlan/getPlan.useCase';
import { GetUserPlansUseCase } from './useCases/getUserPlans/getUserPlans.useCase';

@Module({
  imports: [],
  controllers: [PlanController],
  providers: [CreatePlanUseCase, GetPlanUseCase, GetUserPlansUseCase, PlanService, PrismaService],
})
export class PlanModule {}
