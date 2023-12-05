import { Module } from '@nestjs/common';
import { PlanController } from './controllers/plan.controller';
import { CreatePlanUseCase } from './useCases/createPlan/createPlan.useCase';
import { PlanService } from './services/plan.service';
import { PrismaService } from 'src/shared/config/prisma.service';

@Module({
  imports: [],
  controllers: [PlanController],
  providers: [CreatePlanUseCase, PlanService, PrismaService],
})
export class PlanModule {}
