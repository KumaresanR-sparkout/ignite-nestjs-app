import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MONGOOSE_OPTIONS, MONGODB } from "./config/mongoose.config";
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(MONGODB, MONGOOSE_OPTIONS),
    UserModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
