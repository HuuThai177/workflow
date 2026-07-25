module.exports = {
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/workflow_db?schema=public',
  },
};
