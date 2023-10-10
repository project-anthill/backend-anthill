import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/config/prisma.service';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create() {
    return this.prisma.user.create({ data: {} });
  }
}
