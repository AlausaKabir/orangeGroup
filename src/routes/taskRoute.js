import express from 'express';
import TaskController from '../apps/task/controllers/taskController';
import validate from '../validation/validatorClass';
import {
  createTaskSchema,
  idSchema,
  updateTaskSchema,
  getTasksSchema,
} from '../apps/task/validation/task';

const router = express.Router();

router.get('/fetch-product', TaskController.fetchProductController);

router.post(
  '/',
  validate(createTaskSchema),
  TaskController.createTaskController
);

router.get('/:id', validate(idSchema), TaskController.getTaskController);

router.delete('/:id', validate(idSchema), TaskController.deleteTaskController);

router.put(
  '/:id',
  validate(updateTaskSchema),
  TaskController.updateTaskController
);

router.get('/', validate(getTasksSchema), TaskController.getTasksController);

export default router;
