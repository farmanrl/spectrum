import { isAuthenticated } from '../redux/auth';
import App from './App';
import SignIn from './SignIn';
import Navigation from './Navigation';

export const paths = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  NAV: '/'
};


const requireAuth = (getState) => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = (getState) => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.NAV);
    }
  };
};

export const getRoutes = (getState) => {
  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [
      {
        indexRoute: {
          component: Navigation,
          onEnter: requireAuth(getState)
        }
      },
      {
        path: paths.SIGN_IN,
        component: SignIn,
        onEnter: requireUnauth(getState)
      }
    ]
  };
};
