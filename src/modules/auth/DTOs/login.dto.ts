import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from '../../../shared/models/userProfile.model';

export class LoginDTO {
  @ApiProperty({
    example: 'yourUsername',
  })
  email: UserProfile['email'];
  @ApiProperty({
    format: 'password',
    writeOnly: true,
  })
  password: UserProfile['password'];
}
