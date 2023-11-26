import { Injectable, NotFoundException } from '@nestjs/common';
import { UserProfileService } from '../../services/userProfile.service';
import {
  IFindManyUserRequest,
  IFindManyUserResponse,
} from './findManyUser.interface';
import { UserService } from '../../services/user.service';

@Injectable()
export class FindManyUserUseCase {
  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService,
  ) {}

  async execute(
    request: IFindManyUserRequest,
  ): Promise<IFindManyUserResponse[]> {
    try {
      const userProfiles = await this.userProfileService.findMany(request);
      const cleanUserProfiles = userProfiles.map((profile) => {
        delete profile.password;
        delete profile.id;
        return profile;
      });
      const usersActive = (await this.userService.findMany()).filter(
        (user) => user.isActive,
      );
      const filteredUserProfiles = cleanUserProfiles.filter((profile) =>
        usersActive.some((user) => user.id === profile.userId),
      );

      return filteredUserProfiles;
    } catch (error) {
      throw new NotFoundException('Nobody was found!');
    }
  }
}
