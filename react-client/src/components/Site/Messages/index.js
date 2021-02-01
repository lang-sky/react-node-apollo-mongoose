import React, { useState, useEffect, lazy } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { MESSAGES_SUBSCRIPTION } from '../../../clients/graphql/message';

const MessageWriter = lazy(() => import('./MessageWriter'));
const MessagesList = lazy(() => import('./MessagesList'));

const Messages = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Container>
      {isLoggedIn ? <MessageWriter /> : null}
      <MessagesList />
    </Container>
  );
};

export default Messages;
