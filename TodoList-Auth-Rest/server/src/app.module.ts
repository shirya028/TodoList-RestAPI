import { Module, Options } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './modules/todo/todo.controller';
import { TodoService } from './modules/todo/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './modules/todo/todo.entity';
import { UserEntity } from './modules/user/user.entity';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from './constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './modules/user/strategies/local.strategy';
import { JwtStrategy } from './modules/user/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret : "abc1234",
      signOptions: { expiresIn: '2h' }
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sh',
      password: '123456',
      database: 'ToDoList',
      synchronize: true,
      entities: [TodoEntity,UserEntity],
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
    TypeOrmModule.forFeature([TodoEntity, UserEntity]),

  ],
  controllers: [AppController,TodoController, UserController],
  providers: [AppService, TodoService, UserService,LocalStrategy, JwtStrategy],
})
export class AppModule {}
