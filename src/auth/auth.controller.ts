import { Controller, Post, Body, Get, Response } from '@nestjs/common';
import { User } from './auth.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async LoginUser(
    @Body('password') password: string,
    @Body('email') email: string,
  ) {
    const user = await this.authService.LoginUser(email, password);
    return { user };
  }

  @Post('/register')
  async RegisterUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('phone') phone: string,
    @Body('token') token: string,
  ) {
    const user = await this.authService.RegisterUser(
      email,
      password,
      name,
      phone,
      token,
    );
    return { user };
  }

  @Get()
  async GetProfileUser(@User() user) {
    return user;
  }

  @Post('/login/firebase')
  async LoginWithEmailFireBase(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('phone') phone: string,
    @Body('token') token: string,
    @Body('avatar') avatar: string,
  ) {
    const user = await this.authService.LoginWithFirebase(
      email,
      name,
      phone,
      avatar,
      token,
    );
    return user;
  }
}
