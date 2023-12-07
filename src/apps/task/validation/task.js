import joi from 'joi';
import { taskStatus } from '../../../utils/constant';

export const createTaskSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  status: joi
    .string()
    .valid(...Object.values(taskStatus))
    .default(taskStatus.PENDING),
});

export const idSchema = joi.object({
  id: joi.string().required(),
});

export const updateTaskSchema = joi
  .object({
    id: joi.string().required(),
    title: joi.string(),
    description: joi.string(),
    status: joi.string().valid(...Object.values(taskStatus)),
  })
  .optional('title', 'description', 'status');

export const getTasksSchema = joi.object({
  title: joi.string(),
  status: joi.string().valid(...Object.values(taskStatus)),
  page: joi.number().default(1),
  limit: joi.number().default(10),
});
