import { Plan } from "src/shared/models/plan.model"
import { PlanCategory } from "src/shared/models/planCategory.model"
export class GetPlanResponse {
id:Plan['id'];
userId:Plan['userId'];
title:Plan['title'];
resume:Plan['resume'];
description:Plan['description'];
createdAt:Plan['createdAt'];
updatedAt:Plan['updatedAt'];
isClosed:Plan['isClosed'];
isActive:Plan['isActive'];
planStage:Plan['planStage'];
bannerImageUrl:Plan['bannerImageUrl'];
iconImageUrl:Plan['iconImageUrl'];
planCategories:{
    id:PlanCategory['id'];
    name:PlanCategory['name'];
    description:PlanCategory['description'];
    createdAt:PlanCategory['createdAt'];
    updatedAt:PlanCategory['updatedAt'];
    updatedBy:PlanCategory['updatedBy'];
}[];
}