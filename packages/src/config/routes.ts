import FourOhFour from 'src/lib/scenes/FourOhFour';
import Home from 'src/lib/scenes/Home';
import { IRoute } from 'src/lib/types/general';

export const entry: IRoute[] = [
  {
    component: Home,
    exact: true,
    path: '/',
  },
  {
    component: FourOhFour,
  },
];
