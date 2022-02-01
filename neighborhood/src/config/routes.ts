import IRoute from '../interfaces/route';
import HomePage from '../pages/Home';
import NeighborhoodPage from '../pages/Neighborhood';
import RoomPage from '../pages/Room';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage,
        exact: true
    },
    {
        path: '/neighborhood',
        name: 'Neighborhood Page',
        component: NeighborhoodPage,
        exact: true
    },
    {
        path: '/room',
        name: 'Room Page',
        component: RoomPage,
        exact: true
    }
]

export default routes;