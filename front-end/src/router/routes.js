// routes.js
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/Login/Login";
import NotFoundPage from "../pages/NotPoundPage/NotPoundPage";
import Register from "../pages/Register/Register";
import TosPage from "../pages/TOS/TosPage";

export const langRoutes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: false,
    footerType: "shipping",
  },
  {
    path: "/tos",
    page: TosPage,
    isShowHeader: false,
    footerType: "shipping",
  },
];

export const globalRoutes = [
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/signup",
    page: Register,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
