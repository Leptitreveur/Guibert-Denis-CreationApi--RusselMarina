import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';

const SECRET_KEY = process.env.SECRET_KEY;

const checkJWT = asyncHandler(async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(401).json({
      message: 'token_required!',
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'token_not_valid!',
      });
    }
    req.decoded = decoded;
    const newToken = jwt.sign(
      {
        user: decoded.user,
      },
      SECRET_KEY,
      {
        expiresIn: '24h',
      }
    );

    res.header('Authorization', 'Bearer ' + newToken);
    next();
  });
});

export default checkJWT;
