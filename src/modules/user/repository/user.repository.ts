import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository{
    private readonly repository: any;

    async create(data: any) {
        const User = this.repository.create(data);
        return this.repository.save(User);
      }

    async getOne(data: any) {
        const user = this.repository.findOne(data);
        return user;
    }
}