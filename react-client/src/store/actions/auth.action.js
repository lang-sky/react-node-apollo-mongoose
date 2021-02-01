import { SIGNOUT } from '../types';
import { isExistLocalToken } from '../../utils';

export const checkAuthAction = () => async (dispatch) => {
  if (isExistLocalToken()) {
    //
  } else {
    dispatch({ type: SIGNOUT });
  }
};
