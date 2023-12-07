import TaskRepo from '../../../repository/Task';
import HelperFunctions from '../../../utils/helperFunctions';
import keys from '../../../config/keys';

/**
 * @description Task Service class
 */

export default class TaskService {
  /**
   * @description function to create a new task
   * @param {object} data - req body object from the TaskController
   * @return {object} Returned object
   */
  static async createTaskService(data) {
    try {
      const task = await TaskRepo.taskNameExist(data.title);

      if (task)
        return {
          statusCode: 409,
          message: 'Task already exists',
        };

      const result = await TaskRepo.createTask(data);

      logger.info(`createTaskService -> result: ${JSON.stringify(result)}`);

      return {
        statusCode: 201,
        message: 'Task created successfully',
        data: result,
      };
    } catch (error) {
      logger.error(
        `createTaskService -> error: ${JSON.stringify(error.message)}`
      );
      throw error;
    }
  }

  /**
   * @description function to get a task by id
   * @param {object} data - req params object from the TaskController
   * @return {object} Returned object
   */
  static async getTaskService(data) {
    const { id } = data;
    try {
      const result = await TaskRepo.getTask(id);

      logger.info(`getTaskService -> result: ${JSON.stringify(result)}`);

      return {
        statusCode: 200,
        message: 'Task retrieved successfully',
        data: result,
      };
    } catch (error) {
      logger.error(`getTaskService -> error: ${JSON.stringify(error.message)}`);
      throw error;
    }
  }

  /**
   * @description function to delete a task by id
   * @param {object} data - req params object from the TaskController
   * @return {object} Returned object
   */
  static async deleteTaskService(data) {
    const { id } = data;
    try {
      const task = await TaskRepo.getTask(id);

      if (!task)
        return {
          statusCode: 404,
          message: 'Task not found',
        };

      const result = await TaskRepo.deleteTask(id);

      logger.info(`deleteTaskService -> result: ${JSON.stringify(result)}`);

      return {
        statusCode: 200,
        message: 'Task deleted successfully',
      };
    } catch (error) {
      logger.error(
        `deleteTaskService -> error: ${JSON.stringify(error.message)}`
      );
      throw error;
    }
  }

  /**
   * @description function to update a task by id
   * @param {object} params - req params object from the TaskController
   * @param {object} data - req body object from the TaskController
   * @return {object} Returned object
   */
  static async updateTaskService(params, data) {
    const { id } = params;
    try {
      const task = await TaskRepo.getTask(id);

      if (!task)
        return {
          statusCode: 404,
          message: 'Task not found',
        };

      const taskNameExist = await TaskRepo.taskNameExist(data.title);

      if (taskNameExist && taskNameExist.id !== id)
        return {
          statusCode: 409,
          message: 'Task name already exists on another task',
        };

      const result = await TaskRepo.updateTask(id, data);

      logger.info(`updateTaskService -> result: ${JSON.stringify(result)}`);

      return {
        statusCode: 200,
        message: 'Task updated successfully',
        data: result,
      };
    } catch (error) {
      logger.error(
        `updateTaskService -> error: ${JSON.stringify(error.message)}`
      );
      throw error;
    }
  }

  /**
   * @description function to get all tasks
   * @param {object} data - req query object from the TaskController
   * @return {object} Returned object
   */
  static async getTasksService(data) {
    try {
      const result = await TaskRepo.getTasks(data);

      logger.info(`getTasksService -> result: ${JSON.stringify(result)}`);

      return {
        statusCode: 200,
        message: 'Tasks retrieved successfully',
        data: result,
      };
    } catch (error) {
      logger.error(
        `getTasksService -> error: ${JSON.stringify(error.message)}`
      );
      throw error;
    }
  }

  /**
   * @description function to fetch product
   * @return {object} Returned object
   */
  static async fetchProductService() {
    try {
      const { TODO } = keys.EXTERNAL_APIS;

      const url = TODO;

      const method = 'GET';

      const result = await HelperFunctions.makeRequest(url, method);

      logger.info(`fetchProductService -> result: ${JSON.stringify(result)}`);

      return {
        statusCode: 200,
        message: 'Product fetched successfully',
        data: result,
      };
    } catch (error) {
      logger.error(
        `fetchProductService -> error: ${JSON.stringify(error.message)}`
      );
      throw error;
    }
  }
}
