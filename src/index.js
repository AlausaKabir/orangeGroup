import server from './routes/index';
import keys from './config/keys';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Port = keys.PORT || 8080;

const startServer = async () => {
  try {
    await prisma.$connect().then(() => {
      logger.info('Database connected');
    });
    await server.listen(Port, () => {
      logger.info(`Server listening on port ${Port}`);
    });
  } catch (error) {
    logger.error(`Error starting server: ${error.message}`);
  }
};

startServer();
