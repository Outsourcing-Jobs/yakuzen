// routes.js
import HomePage from '../pages/Home/HomePage';
import Login from '../pages/Login/Login';
import NotFoundPage from '../pages/NotPoundPage/NotPoundPage';
import Register from '../pages/Register/Register';

export const langRoutes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: false,
        footerType: 'shipping',
    },
];

export const globalRoutes = [
    {
        path: '/login',
        page: Login,
    },
    {
        path: '/signup',
        page: Register,
    },
    {
        path: '*',
        page: NotFoundPage,
    },
];
