import { Body, Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { RegisterDto } from './dto/register';
import { RefreshTokenDto } from './dto/refresh-token';
import { LogoutDto } from './dto/logout';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto);
  }

  @Post('logout')
  logout(
    @Headers('authorization') authorization: string | undefined,
    @Body() logoutDto: LogoutDto,
  ) {
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const accessToken = authorization.split(' ')[1];
    return this.authService.logout(accessToken, logoutDto);
  }
}