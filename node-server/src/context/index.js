import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

const getMe = async (req) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    try {
      const token = authorization.split(' ')[1];
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const context = async ({ req, connection }) => {
  // todo: handle dataloader

  if (connection) {
    // todo: subscription
  }

  if (req) {
    const me = await getMe(req);
    return { me };
  }
};

export default context;
