import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { UserProfileService } from '../../services/userProfile.service';

@Injectable()
export class DeactiveUserUseCase {
  constructor(
    private userProfileService: UserProfileService,
    private userService: UserService,
  ) {}

  async handler(userId: string): Promise<any> {
    try {
      await this.userProfileService.deleteProfile(userId);
      await this.userService.deactive(userId);
    } catch (error) {
      throw new NotFoundException('User profile cant be deleted!');
    }
  }
}
