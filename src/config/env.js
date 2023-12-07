module.exports = {
  development: {
    database: process.env.LOCAL_DB,
  },
  production: {
    database: process.env.PRODUCTION_DATABASE,
  },
  staging: {
    database: process.env.STAGING_DATABASE,
  },
};
