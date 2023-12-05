import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PlanModule } from './modules/plan/plan.module';

@Module({
  imports: [UserModule, AuthModule, PlanModule],
})
export class AppModule {}
