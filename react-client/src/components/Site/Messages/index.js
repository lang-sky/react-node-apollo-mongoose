import React, { lazy } from 'react';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';

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
