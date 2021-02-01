import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import {
  GET_MESSAGES,
  MESSAGES_SUBSCRIPTION,
} from '../../../clients/graphql/message';

const Messages = () => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES);
  const history = useHistory();

  const subscribeToNewMessages = useCallback(() => {
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageCreated;
        return Object.assign({}, prev, {
          messages: {
            edges: [newMessage, ...prev.messages.edges],
          },
        });
      },
    });
  }, [subscribeToMore]);

  useEffect(() => {
    subscribeToNewMessages();
  }, [subscribeToNewMessages]);

  if (error) return `Error ${error.message}`;

  return (
    <Container>
      {loading ? (
        <LinearProgress />
      ) : (
        <List>
          {data.messages.edges.map(({ id, text, createdAt }) => (
            <div key={id}>
              <ListItem>
                <ListItemText
                  primary={text}
                  secondary={moment(new Date(createdAt)).format('llll')}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => history.push(`/messages/${id}`)}>
                    <DetailsIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Messages;
