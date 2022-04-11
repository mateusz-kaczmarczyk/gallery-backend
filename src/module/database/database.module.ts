import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: +process.env.DB_PORT,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      })
    })
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule { }
