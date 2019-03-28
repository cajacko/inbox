import FourOhFour from 'src/lib/scenes/FourOhFour';
import Home from 'src/lib/scenes/Home';
import Login from 'src/lib/scenes/Login';
import { IRoute } from 'src/lib/types/general';

export const entry: IRoute[] = [
  {
    component: Home,
    exact: true,
    path: '/',
  },
  {
    component: Home,
    exact: true,
    path: '/done',
  },
  {
    component: Home,
    exact: true,
    path: '/snoozed',
  },
  {
    component: Login,
    exact: true,
    path: '/login',
    public: true,
  },
  {
    component: FourOhFour,
    public: true,
  },
];
