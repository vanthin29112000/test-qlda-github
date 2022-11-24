import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { Auth } from 'src/auth/auth.model';
const JWT = require('jsonwebtoken');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // constructor(private readonly authModel: Model<Auth>) {}
  constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith('Bearer')) {
      const token = authorization.split(' ')[1];

      try {
        const resultVerify = JWT.verify(token, 'Ma bi mat');
        const user = await this.authModel
          .findOne({
            email: resultVerify.email,
          })
          .select('-password ');

        if (!user || user.block.isBLocking) {
          throw new HttpException('Không tìm thấy tài khoản này', 400);
        }

        req.user = user;
        next();
      } catch (error) {
        throw new HttpException('Not authorized or', 401);
      }
    } else {
      throw new HttpException('Not authorized', 401);
    }
  }
}
