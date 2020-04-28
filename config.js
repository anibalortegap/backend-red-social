module.exports = {
  api: {
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      '1s5y&9dnAf^BzdGB8bn8e%lDW6tB#rETgKs%Kk46TtPJocxL$4',
  },
  mysql: {
    host:
      process.env.MYSQL_HOST ||
      'biwwa3tt8rkdd8xnkjy3-mysql.services.clever-cloud.com',
    user: process.env.MYSQL_USER || 'ukgjaw6tqpxfg1ix',
    password: process.env.MYSQL_PASS || '0E8v98W5AuHjcQclV0wf',
    database: process.env.MYSQL_DB || 'biwwa3tt8rkdd8xnkjy3',
  },
};
