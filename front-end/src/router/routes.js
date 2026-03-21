import HomePage from '../pages/Home/HomePage';
import Login from '../pages/Login/Login';
import NotFoundPage from '../pages/NotPoundPage/NotPoundPage';
import Register from '../pages/Register/Register';
import TosPage from '../pages/TOS/TosPage';
import CategoryList from '../pages/CategoryList/CategoryList';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import EdgyHome from '../pages/EdgyHome/EdgyHome';

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
        path: '/art-showcase',
        page: EdgyHome,
        isShowHeader: false,
        footerType: 'shipping',
    },
    {
        path: '/category/:categoryId',
        page: CategoryList,
        isShowHeader: false,
        footerType: 'shipping',
    },
    {
        path: '/product/:productId',
        page: ProductDetail,
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
