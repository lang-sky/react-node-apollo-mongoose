import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import { CREATE_MESSAGE } from '../../../clients/graphql/message';

const MessageWriter = () => {
  const [text, setText] = useState('');
  const [createMessage, { loading, error, data }] = useMutation(CREATE_MESSAGE);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (text) {
      try {
        await createMessage({ variables: { text } });
        setText('');
      } catch (error) {}
    }
  };

  return (
    <>
      <TextField
        variant="outlined"
        label="Message"
        fullWidth
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
        endadornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleSendMessage}
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      {error && <Typography>{error.message}</Typography>}
    </>
  );
};

export default MessageWriter;
