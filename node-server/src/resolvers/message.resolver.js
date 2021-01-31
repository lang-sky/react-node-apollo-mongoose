import { combineResolvers } from 'graphql-resolvers';

import models from '../models';
import pubsub, { EVENTS } from '../subscription';
import { isAuthenticated, isMessageOwner } from './authorization.resolver';
import { fromCursorHash, toCursorHash } from '../services/message.service';

const getMessages = async (parent, { cursor, limit = 100 }) => {
  const cursorOptions = cursor
    ? { createdAt: { $lt: fromCursorHash(cursor) } }
    : {};

  const messages = await models.Message.find(cursorOptions, null, {
    sort: { createdAt: -1 },
    limit: limit + 1,
  });

  const hasNextPage = messages.length > limit;
  const edges = hasNextPage ? messages.slice(0, -1) : messages;

  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString()),
    },
  };
};

const getMessage = async (parent, { id }) => {
  return await models.Message.findById(id);
};

const createMessage = combineResolvers(
  isAuthenticated,
  async (parent, { text }, { me }) => {
    const message = await models.Message.create({
      text,
      userId: me.id,
    });

    pubsub.publish(EVENTS.MESSAGE.CREATED, { messageCreated: { message } });

    return message;
  }
);

const deleteMessage = combineResolvers(
  isAuthenticated,
  isMessageOwner,
  async (parent, { id }) => {
    const message = await models.Message.findByIdAndDelete(id);
    return !!message;
  }
);

const getMessageOwner = async (message) => {
  const user = await models.User.findById(message.userId);
  return user;
};

const messageCreated = {
  subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
};

export default {
  Query: {
    messages: getMessages,
    message: getMessage,
  },
  Mutation: { createMessage, deleteMessage },
  Message: {
    user: getMessageOwner,
  },
  Subscription: { messageCreated },
};
