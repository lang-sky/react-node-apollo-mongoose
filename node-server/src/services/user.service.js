import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const createToken = async (user) => {
  const { id, email, username, role } = user;

  const token = await jwt.sign(
    { id, email, username, role },
    process.env.SECRET,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  return {
    token,
    role,
    expiresIn: process.env.EXPIRES_IN,
  };
};
