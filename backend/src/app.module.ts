import { Module } from '@nestjs/common';
import { UserModule } from './Users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Common/Entity/user.entity';
import { AuthModule } from './Auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { Todo } from './Common/Entity/todo.entity';
@Module({
  imports: [
    UserModule,
    AuthModule,
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs',
      entities: [User, Todo],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
