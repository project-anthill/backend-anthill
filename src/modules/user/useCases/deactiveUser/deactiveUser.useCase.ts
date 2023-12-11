import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { UserProfileService } from '../../services/userProfile.service';
import { ResponseHandler } from 'src/shared/utils/response.handler';

@Injectable()
export class DeactiveUserUseCase {
  constructor(
    private userProfileService: UserProfileService,
    private userService: UserService,
  ) {}

  async execute(userId: string): Promise<ResponseHandler> {
    try {
      await this.userProfileService.deleteProfile(userId);
      await this.userService.deactive(userId);
      return {
        message: 'deleted successfully',
        status: '204'
      }
    } catch (error) {
      throw new NotFoundException('User profile cant be deleted!');
    }
  }
}
