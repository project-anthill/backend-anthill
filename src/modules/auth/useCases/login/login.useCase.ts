import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginInputDTO, LoginOutputDTO } from '../../DTOs/login.dto';
import { UserProfileService } from 'src/modules/user/services/userProfile.service';
import { JWTService } from '../../utils/jwt.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUseCase {
  constructor(
    private userProfileService: UserProfileService,
    private jwt: JWTService,
  ) {}

  async handle(request: LoginInputDTO): Promise<LoginOutputDTO> {
    const userFound = await this.userProfileService.findOne({email: request.email});

    if (!userFound) throw new NotFoundException('Credenciais não encontradas');

    const result = await bcrypt.compareSync(
      request.password,
      userFound.password,
    );

    if (!result)
      throw new UnauthorizedException(
        'Não foi possível realizar login! Tente novamente.',
      );

    const accessToken = this.jwt.generateAccessToken(
      { userId: userFound.userId, email: userFound.email },
      '1h',
    );

    const refreshToken = this.jwt.generateRefreshToken(
      { userId: userFound.userId },
      '7d',
    );

    return {
      access_token: accessToken,
      expires_in: 3600000,
      refresh_token: refreshToken,
    };
  }
}
