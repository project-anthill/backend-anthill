import { ApiProperty } from '@nestjs/swagger';
import { user } from '@prisma/client';

export class RequestConnectionUserDTO{
  @ApiProperty({
    example: 'requesting-user-id',
  })
  userId?: user['id'];

  @ApiProperty({
    example: 'requested-user-id',
  })
  connUserId?: user['id'];

}
