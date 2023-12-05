import { Injectable } from '@nestjs/common';
import { plan, user } from '@prisma/client';
import { PrismaService } from 'src/shared/config/prisma.service';
import { IPlanService } from './interfaces/plan.interface';
import { CreatePlanDTO } from '../DTOs/plan.dto';
@Injectable()
export class PlanService implements IPlanService{
  constructor(private prisma: PrismaService) {}

  async create(request: CreatePlanDTO): Promise<plan> {
    return this.prisma.plan.create({ data: {
        title: request.title,
        resume: request.resume,
        description: request.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        isClosed: false,
        isActive: true,
        planStage: request.planStage,
        bannerImageUrl: request.bannerImageUrl,
        iconImageUrl: request.iconImageUrl,
        user: { connect: { id: request.userId } },
    } });
  }
}
