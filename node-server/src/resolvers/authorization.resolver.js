import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';
import models from '../models';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMIN' ? skip : new ForbiddenError('Not authorized as admin')
);

export const isMessageOwner = async (parent, { id: messageId }, { me }) => {
  const message = await models.findById(messageId);

  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as message owner');
  }

  return skip;
};
