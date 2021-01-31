import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_MESSAGES } from '../../clients/graphql/message';

const Messages = () => {
  const { loading, error, data } = useQuery(GET_MESSAGES);

  if (loading) return 'Loading';
  if (error) return `Error ${error.message}`;

  return <div>data fetched</div>;
};

export default Messages;
