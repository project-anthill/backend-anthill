import { Injectable } from "@nestjs/common";
import { IPlanCategoryService } from "./interfaces/planCategory.interface";
import { PrismaService } from "src/shared/config/prisma.service";
import { CreatePlanCategoryDTO } from "../DTOs/createPlanCategory.dto";
import { PlanCategory } from "src/shared/models/planCategory.model";
import { GetPlanCategoryDTO } from "../DTOs/getPlanCategory.dto";

@Injectable()
export class PlanCategoryService implements IPlanCategoryService{
  constructor(private prisma: PrismaService) {}

  async create(request: CreatePlanCategoryDTO): Promise<PlanCategory> {
    return this.prisma.planCategory.create({ data: {
        name: request.name,
        description: request.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: request.updatedBy
    } });
  }

  async getPlanCateories(): Promise<PlanCategory[]>{
    return this.prisma.planCategory.findMany();
  }
  
  async getPlanCategory(request: GetPlanCategoryDTO): Promise<PlanCategory>{
    return this.prisma.planCategory.findUnique({
      where: { id: request.planCategoryId },
    });
  }
}
