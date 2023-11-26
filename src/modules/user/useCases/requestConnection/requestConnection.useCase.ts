import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { UserProfileService } from '../../services/userProfile.service';

@Injectable()
export class RequestConnectionUseCase {
  constructor(
    private userProfileService: UserProfileService,
    private userService: UserService,
  ) {}

  async execute(token: string, userId: string): Promise<any> {
    try {
        
    } catch (error) {
      throw new NotFoundException('Request connection can not be sent!');
    }
  }
}
