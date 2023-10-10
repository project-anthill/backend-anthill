import { ApiProperty } from "@nestjs/swagger"
import { UserProfile } from "../Models/userProfile.model"

export class CreateUserDTO{
    @ApiProperty({
        example: 'yourUsername',
    })
    username: UserProfile['username']

    @ApiProperty({
        example: 'user@email.com',
    })
    email: UserProfile['email']
    
    @ApiProperty({
        example: 'Generic',
    })
    firstName: UserProfile['firstName']
    
    @ApiProperty({
        example: 'Name',
    })
    lastName: UserProfile['lastName']
    
    @ApiProperty({
        example: '1990-01-15T12:00:00.000Z',
    })
    birthDate: UserProfile['birthDate']
    
    @ApiProperty({
        example: '"12911113333"',
    })
    phone: UserProfile['phone']
    
    @ApiProperty({ enum: 
        ['male', 'female', 'nonBinary','other','prefererNotToSay']
    })
    gender: UserProfile['gender']
    
    @ApiProperty({
        example: '******',
    })
    password: UserProfile['password']
}