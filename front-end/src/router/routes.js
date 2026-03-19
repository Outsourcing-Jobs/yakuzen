// routes.js
import HomePage from '../pages/Home/HomePage';
import Login from '../pages/Login/Login';
import NotFoundPage from '../pages/NotPoundPage/NotPoundPage';
import Register from '../pages/Register/Register';
import TosPage from '../pages/TOS/TosPage';
import TosPageV2 from '../pages/TOS/TosPageV2';

export const langRoutes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: false,
        footerType: 'shipping',
    },
    {
        path: '/tos',
        page: TosPage,
        isShowHeader: false,
        footerType: 'shipping',
    },
    {
        path: '/tos-v2',
        page: TosPageV2,
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
