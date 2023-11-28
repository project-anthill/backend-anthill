import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from '../../../shared/models/userProfile.model';

export class LoginInputDTO {
  @ApiProperty({
    example: 'yourUsername',
  })
  email: UserProfile['email'];
  @ApiProperty({
    example: '',
    writeOnly: true,
  })
  password: UserProfile['password'];
}

export class LoginOutputDTO {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}