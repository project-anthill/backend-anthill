import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from '../../../shared/models/userProfile.model';

export class UpdateUserDTO {
  @ApiProperty({
    example: 'yourUsername',
  })
  username?: UserProfile['username'];

  @ApiProperty({
    example: 'user@email.com',
  })
  email?: UserProfile['email'];

  @ApiProperty({
    example: 'Generic',
  })
  firstName?: UserProfile['firstName'];

  @ApiProperty({
    example: 'Name',
  })
  lastName?: UserProfile['lastName'];

  @ApiProperty({
    example: '"12911113333"',
  })
  phone?: UserProfile['phone'];
}
