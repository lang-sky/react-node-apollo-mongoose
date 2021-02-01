import 'dotenv/config';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

import { isAdmin, isAuthenticated } from './authorization.resolver';
import models from '../models';
import { createToken } from '../services/user.service';

const getUsers = combineResolvers(isAdmin, async () => {
  return await models.User.find();
});

const getUser = combineResolvers(isAdmin, async (parent, { id }) => {
  return await models.User.findById(id);
});

const getMe = async (parent, args, { me }) => {
  if (!me) {
    return null;
  }

  return await models.User.findById(me.id);
};

const signUp = async (parent, { username, email, password }) => {
  // NOTE: error handler not required: res.errors existed

  const user = await models.User.create({
    username,
    email,
    password,
  });

  return createToken(user);
};

const signIn = async (parent, { login, password }) => {
  const user = await models.User.findByLogin(login);

  if (!user) {
    throw new UserInputError('No user found with this login credentials');
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    throw new AuthenticationError('Invalid password');
  }

  return createToken(user);
};

const updateUser = combineResolvers(
  isAuthenticated,
  async (parent, { username }, { me }) => {
    return await models.User.findByIdAndUpdate(
      me.id,
      { username },
      { new: true } // return the document after updated
    );
  }
);

const deleteUser = combineResolvers(isAdmin, async (parent, { id }) => {
  // ! this doesn't fire pre('remove')
  // const user = await models.User.findByIdAndDelete(id);
  // return !!user;

  const user = await models.User.findById(id);

  if (user) {
    const res = await user.remove();
    return !!res;
  } else {
    return false;
  }
});

const getMessages = async (user) => {
  return await models.Message.find({ userId: user.id });
};

export default {
  Query: {
    users: getUsers,
    user: getUser,
    me: getMe,
  },
  Mutation: { signUp, signIn, updateUser, deleteUser },
  User: { messages: getMessages },
};
