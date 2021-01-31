import { GraphQLDateTime } from 'graphql-iso-date';

import userResolver from './user.resolver';
import messageResolver from './message.resolver';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [customScalarResolver, userResolver, messageResolver];
