import { SIGNIN_SUCCESS, SIGNUP_SUCCESS, SIGNOUT } from '../types';
import { isExistLocalToken } from '../../utils';

const initialState = () => ({
  isLoggedIn: isExistLocalToken(),
  isAdmin: localStorage.getItem('role') === 'ADMIN',
});

const setAuth = (state, { token, role, expiresIn }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
  localStorage.setItem('expires_at', new Date().getTime() + expiresIn * 1000);
  return {
    ...state,
    isLoggedIn: true,
    isAdmin: role === 'ADMIN',
  };
};

const authReducer = (state = initialState(), action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return setAuth(state, action.payload);

    case SIGNUP_SUCCESS:
      return setAuth(state, action.payload);

    case SIGNOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('expires_at');
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
      };

    default:
      return state;
  }
};

export default authReducer;
