import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/config/prisma.service';
import { IPlanService } from './interfaces/plan.interface';
import { CreatePlanDTO } from '../DTOs/createPlan.dto';
import { GetPlanDTO } from '../DTOs/getPlan.dto';
import { Plan } from 'src/shared/models/plan.model';
import { planHasCategories as PlanHasCategories } from '@prisma/client';
@Injectable()
export class PlanService implements IPlanService{
  constructor(private prisma: PrismaService) {}

  async create(request: CreatePlanDTO): Promise<Plan> {
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

  async getPlan(request: Pick<GetPlanDTO, 'planId'>): Promise<any>{
    return this.prisma.plan.findUnique({
      where: { id: request.planId },
      include: {
        planCategories: {
          include: {
            category: true,
          }
        }
      },
    });
  }
  
  async getUserPlans(request: Pick<GetPlanDTO, 'userId'>): Promise<any[]>{
    return this.prisma.plan.findMany({
      where: { userId: request.userId },
      include: {
        planCategories: {
          include: {
            category: true,
          }
        }
      },
    });
  }

  async addCategoriesToPlan(planId: string, categoryId: string): Promise<PlanHasCategories>{
    return this.prisma.planHasCategories.create({
      data:{
        plan: { connect: { id: planId } },
        category: { connect: { id: categoryId } },
      }
    })
  }
}
