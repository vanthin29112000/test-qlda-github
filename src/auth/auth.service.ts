import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './auth.model';
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

@Injectable()
export class AuthService {
  // private auth: Auth[] = [];
  constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}
  async LoginUser(email: string, password: string) {
    const user = await this.authModel
      .findOne({ email: email })
      .select('-password ');

    if (!user) {
      throw new HttpException('Email chưa được đăng kí', 400);
    }

    if (user.block.isBLocking) {
      throw new HttpException('Tài khoản đã bị khóa !!', 400);
    } else {
      return {
        user: user,
        token: JWT.sign({ email }, 'Ma bi mat', { expiresIn: '1d' }),
      };
    }
  }

  async RegisterUser(
    email: string,
    password: string,
    name: string,
    phone: string,
    token: string,
  ) {
    const userExist = await this.authModel.findOne({ email });
    if (userExist) {
      throw new HttpException('Email already exists', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new this.authModel({
      email: email,
      password: passwordHash,
      role: 0,
      name: name,
      phone: phone,
    });

    const result = await user.save();
    const userTemp = await this.authModel
      .findOne({ email: email })
      .select('-password');
    return {
      user: userTemp,
      token: JWT.sign({ email }, 'Ma bi mat', { expiresIn: '1d' }),
    };
  }

  async LoginWithFirebase(
    email: string,
    name: string,
    phone: string,
    avatar: string,
    token: string,
  ) {
    const user = await this.authModel
      .findOne({ email: email })
      .select('-password ');
    const tokenSign = JWT.sign({ email }, 'Ma bi mat', { expiresIn: '1d' });
    if (user) {
      console.log(user, tokenSign);
      return { user: user, token: tokenSign };
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('123456789', salt);
      const tempUser = new this.authModel({
        email: email,
        password: passwordHash,
        role: 0,
        name: name,
        phone: phone,
        avatar: avatar,
      });
      const result = await tempUser.save();

      const authTemp = await this.authModel
        .findOne({ email: email })
        .select('-password ');

      return {
        user: authTemp,
        token: tokenSign,
      };
    }
  }
}
