import { isAuthenticated } from '../core/auth';
import App from './app';
import SignIn from './pages/sign-in';
import Projects from './pages/projects';


export const paths = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  PROJECTS: '/'
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
      replace(paths.PROJECTS);
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
          component: Projects,
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
