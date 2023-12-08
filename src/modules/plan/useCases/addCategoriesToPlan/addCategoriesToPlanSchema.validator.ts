import { Joi } from 'src/shared/utils/joi';
import { AddCategoriesToPlanDTO } from '../../DTOs/addCategoriesToPlan.dto';

export const AddCategoriesToPlanSchema = Joi.object<AddCategoriesToPlanDTO>({
  planId: Joi.string().uuid().required(),
  categoriesList: Joi.array().items(Joi.string().uuid()).max(5).optional(),
});