import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';

import { GET_MESSAGE } from '../../clients/graphql/message';

const Message = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MESSAGE, {
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) return <Typography color="secondary">{error.message}</Typography>;

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4">Message Details</Typography>
      <List>
        <ListItem>
          <ListItemText primary={data.message.text} secondary="text" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemText
            primary={moment(new Date(data.message.createdAt)).format('llll')}
            secondary="created at"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemText
            primary={data.message.user.username}
            secondary="created by"
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default Message;
