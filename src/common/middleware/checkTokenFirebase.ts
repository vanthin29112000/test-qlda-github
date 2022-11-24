// logger.middleware.ts
import { HttpException } from '@nestjs/common';

var admin = require('firebase-admin');

var serviceAccount = require('../../../x-career-05-project-final-firebase-adminsdk-p3umv-95d6407c79.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export function logger(req, res, next) {
  const token = req.body.token;

  admin
    .auth()
    .verifyIdToken(token)
    .then(async function (decodedToken) {
      next();
    })
    .catch(function (error) {
      throw new HttpException('Lỗi không thể thực hiện', 400);
    });
}
