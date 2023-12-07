import dotenv from 'dotenv';
dotenv.config();

const keys = {
  DOMAIN: process.env.DOMAIN || `http://localhost:${process.env.PORT || 3000}`,
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  BCRYPT: process.env.BCRYPT || 10,
  EXTERNAL_APIS: {
    TODO: process.env.TODO_API || 'https://jsonplaceholder.typicode.com/todos',
  },
};

export default keys;
