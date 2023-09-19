import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
