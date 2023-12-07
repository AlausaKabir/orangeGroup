import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from '../config/logger';
import morgan from 'morgan';
import notFoundMiddleware from '../middleware/not-found.middleware';
import taskRoute from './taskRoute';

const app = express();

global.logger = Logger.createLogger({ label: 'OrangeGroup' });
app.use(helmet());
app.use(cors({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

app.use(`/healthcheck`, (req, res) => {
  res.status(200).send('Orange Group  is online and healthy techies');
});


app.use('/task', taskRoute);

app.get('/', (req, res) => {
  res.status(200).send('Orange Group Backend is online and healthy techies');
});

app.use(notFoundMiddleware);

export default app;
