import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useStyles } from './SignIn';
import { SIGN_UP } from '../../clients/graphql/user';
import { SIGNUP_SUCCESS } from '../../store/types';

const SignUp = () => {
  const [signUp, { loading, error }] = useMutation(SIGN_UP);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signUp({ variables: formData });
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data.signUp });
    } catch (error) {}
  };

  return (
    <>
      <CssBaseline />
      <Container className={classes.root}>
        <form onSubmit={handleSubmit}>
          {[
            { key: 'email', label: 'Email', type: 'text' },
            { key: 'username', label: 'Username', type: 'text' },
            { key: 'password', label: 'Password', type: 'password' },
          ].map(({ key, label, type }) => (
            <div key={key} className={classes.textFieldContainer}>
              <TextField
                variant="outlined"
                label={label}
                type={type}
                fullWidth
                className={classes.textField}
                required
                value={formData[key]}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    [key]: event.target.value,
                  }))
                }
              />
            </div>
          ))}

          {error && (
            <Typography color="secondary" className={classes.errorMessage}>
              {error.message}
            </Typography>
          )}
          <Button type="submit" color="primary" variant="outlined">
            Sign Up
            {loading && (
              <CircularProgress size={14} className={classes.loadingIcon} />
            )}
          </Button>
        </form>
      </Container>
    </>
  );
};

export default SignUp;
