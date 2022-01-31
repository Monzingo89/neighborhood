import IRoute from '../interfaces/route';
import HomePage from '../pages/Home';
import NeighborhoodPage from '../pages/Neighborhood';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage,
        exact: true
    },
    {
        path: '/neighborhood',
        name: 'About Page',
        component: NeighborhoodPage,
        exact: true
    }
]

export default routes;