import TaskService from '../services/taskService';
import { errorResponse, successResponse } from '../../../utils/response';
import { errorResponseMessage } from '../../../utils/constant';

/**
 * @description Task Controller class
 */

export default class TaskController {
  /**
   * @description create a task controller
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async createTaskController(req, res) {
    try {
      const body = req.body;

      const result = await TaskService.createTaskService(body);

      logger.info(`createTaskController -> result: ${JSON.stringify(result)}`);

      if (result.statusCode !== 201) {
        return errorResponse(res, result.statusCode, result.message);
      }

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `createTaskController -> error: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description get task controller
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getTaskController(req, res) {
    try {
      const params = req.params;

      const result = await TaskService.getTaskService(params);

      logger.info(`getTaskController -> result: ${JSON.stringify(result)}`);

      if (result.statusCode !== 200) {
        return errorResponse(res, result.statusCode, result.message);
      }

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `getTaskByController -> error: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description delete task controller
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async deleteTaskController(req, res) {
    try {
      const params = req.params;

      const result = await TaskService.deleteTaskService(params);

      logger.info(`deleteTaskController -> result: ${JSON.stringify(result)}`);

      if (result.statusCode !== 200) {
        return errorResponse(res, result.statusCode, result.message);
      }

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `deleteTaskController -> error: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description update task controller
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async updateTaskController(req, res) {
    try {
      const params = req.params;
      const body = req.body;

      const result = await TaskService.updateTaskService(params, body);

      logger.info(`updateTaskController -> result: ${JSON.stringify(result)}`);

      if (result.statusCode !== 200) {
        return errorResponse(res, result.statusCode, result.message);
      }

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `updateTaskController -> error: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description get tasks controller
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getTasksController(req, res) {
    try {
      const { query } = req;
      const result = await TaskService.getTasksService(query);

      logger.info(`getTasksController -> result: ${JSON.stringify(result)}`);

      if (result.statusCode !== 200) {
        return errorResponse(res, result.statusCode, result.message);
      }

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `getTasksController -> error: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description fetch product controller
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async fetchProductController(req, res) {
    try {
      const result = await TaskService.fetchProductService();

      if (result.statusCode !== 200) {
        return errorResponse(res, result.statusCode, result.message);
      }

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `fetchProductController -> error: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}
