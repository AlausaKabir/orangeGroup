import { PrismaClient } from '@prisma/client';
import HelperFunctions from '../utils/helperFunctions';

const prisma = new PrismaClient();

/**
 * @fileOverview Task repo class for related database operations.
 */
export default class TaskRepo {
  /**
   * @description function to create a new task
   * @param {object} data - req body object from the TaskController
   * @return {object} Returned object
   */
  static async createTask(data) {
    const { title, description, status } = data;
    try {
      const result = await prisma.task.create({
        data: {
          title: HelperFunctions.capitalize(title),
          description,
          status,
        },
      });

      logger.info(`create -> result: ${JSON.stringify(result)}`);

      return result;
    } catch (error) {
      logger.error(`create -> error: ${JSON.stringify(error.message)}`);
      throw error;
    }
  }

  /**
   * @description function to check if a task exists by title
   * @param {string} title - title of the task
   * @return {object} Returned object
   */
  static async taskNameExist(title) {
    try {
      const result = await prisma.task.findUnique({
        where: {
          title: HelperFunctions.capitalize(title),
        },
      });

      logger.info(
        `checkIfTaskExistsByTitle -> result: ${JSON.stringify(result)}`
      );

      return result;
    } catch (error) {
      logger.error(
        `checkIfTaskExistsByTitle -> error: ${JSON.stringify(error.message)}`
      );
      throw error;
    }
  }

  /**
   * @description function to get a task by id
   * @param {string} id - req params object from the TaskController
   * @return {object} Returned object
   */
  static async getTask(id) {
    try {
      const result = await prisma.task.findUnique({
        where: {
          id: id.toString(),
        },
      });

      logger.info(`get -> result: ${JSON.stringify(result)}`);

      return result;
    } catch (error) {
      logger.error(`get -> error: ${JSON.stringify(error.message)}`);
      throw error;
    }
  }

  /**
   * @description function to delete a task by id
   * @param {object} id - req params object from the TaskController
   * @return {object} Returned object
   */
  static async deleteTask(id) {
    try {
      const result = await prisma.task.delete({
        where: {
          id: id.toString(),
        },
      });

      logger.info(`delete -> result: ${JSON.stringify(result)}`);

      return result;
    } catch (error) {
      logger.error(`delete -> error: ${JSON.stringify(error.message)}`);
      throw error;
    }
  }

  /**
   * @description function to update a task by id
   * @param {string} id - req params object from the TaskController
   * @param {object} data - req body object from the TaskController
   * @return {object} Returned object
   */
  static async updateTask(id, data) {
    if (data.title) {
      data.title = HelperFunctions.capitalize(data.title);
    }

    try {
      const result = await prisma.task.update({
        where: {
          id: id.toString(),
        },
        data: {
          ...Object.keys(data).reduce((acc, key) => {
            acc[key] = HelperFunctions.capitalize(data[key]);
            return acc;
          }, {}),
        },
      });

      logger.info(`update -> result: ${JSON.stringify(result)}`);

      return result;
    } catch (error) {
      logger.error(`update -> error: ${JSON.stringify(error.message)}`);
      throw error;
    }
  }

  /**
   * @description function to get all tasks
   * @param {object} data - req query object from the TaskController
   * @return {object} Returned object
   */
  static async getTasks(data) {
    try {
      let pageNumber = 1;
      let limitNumber = 10;
      const { page = 1, limit = 10, title, status } = data;

      if (page) {
        pageNumber = Number(page);
      }

      if (limit) {
        limitNumber = Number(limit);
      }

      const whereClause = {};

      if (title) {
        whereClause.title = {
          contains: {
            value: title,
            mode: 'insensitive',
          },
        };
      }

      if (status) {
        whereClause.status = {
          equals: {
            value: status,
            mode: 'insensitive',
          },
        };
      }

      const result = await prisma.task.findMany({
        take: limitNumber,
        skip: (pageNumber - 1) * limitNumber,
        where: whereClause,
      });

      const totalTasksCount = await prisma.task.count({ where: whereClause });

      const response = {
        status: 'success',
        statusCode: 200,
        message: 'Tasks retrieved successfully',
        data: result,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          total: totalTasksCount,
          totalPages: Math.ceil(totalTasksCount / limitNumber),
          hasNextPage: totalTasksCount > pageNumber * limitNumber,
          hasPreviousPage: pageNumber > 1,
        },
      };

      logger.info(`getTasks -> response: ${JSON.stringify(response)}`);

      return response;
    } catch (error) {
      logger.error(`getTasks -> error: ${JSON.stringify(error.message)}`);
      throw error;
    }
  }
}
