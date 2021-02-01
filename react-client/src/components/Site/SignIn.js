import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { SIGN_IN } from '../../clients/graphql/user';
import { SIGNIN_SUCCESS } from '../../store/types';

const SignIn = () => {
  const [signIn, { loading, error }] = useMutation(SIGN_IN);
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) history.push('/');
  }, [isLoggedIn, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn({ variables: formData });
      dispatch({ type: SIGNIN_SUCCESS, payload: res.data.signIn });
    } catch (error) {}
  };

  return (
    <>
      <CssBaseline />
      <Container className={classes.root}>
        <form onSubmit={handleSubmit}>
          {[
            { key: 'login', label: 'Email or Username', type: 'text' },
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
            Sign In
            {loading && (
              <CircularProgress size={14} className={classes.loadingIcon} />
            )}
          </Button>
        </form>
      </Container>
    </>
  );
};

export default SignIn;

export const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    width: '500px',
  },
  textFieldContainer: {
    display: 'block',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  errorMessage: {
    textAlign: 'left',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  loadingIcon: {
    marginLeft: theme.spacing(2),
  },
}));
