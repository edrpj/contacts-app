export default () => ({
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    target_db: process.env.DB_TARGET,
  },
  appEnv: process.env.APP_ENV || 'DEVELOPMENT',
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
