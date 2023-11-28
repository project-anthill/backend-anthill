import { Injectable } from '@nestjs/common';
import { LoginInputDTO, LoginOutputDTO } from '../../DTOs/login.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { UserProfileService } from 'src/modules/user/services/userProfile.service';

@Injectable()
export class LoginUseCase {
  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService,
  ) {}

  async handle(request: LoginInputDTO): Promise<LoginOutputDTO> {
    
  }
}
