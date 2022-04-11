const { SnakeNamingStrategy } = require('typeorm-naming-strategies');
require('dotenv-yaml').config();

export = {
  type: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/entity/*.entity.ts'],
  migrations: ['src/migration/*.ts'],
  cli: {
    migrationsDir: "src/migration"
  }
}
