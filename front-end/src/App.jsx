import { Fragment, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Default from './components/Default/Default';
import { globalRoutes, langRoutes } from './router/routes';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import GlobalMenu from './components/Default/GlobalMenu';

function AppContent({ isAdmin, setIsAdmin }) {
    const location = useLocation();

    const isGlobalRoute = globalRoutes.some(route => {
        if (route.path === '*') return false;
        return location.pathname === route.path || location.pathname.startsWith(route.path.replace('/*', ''));
    });

    return (
        <>
            {!isGlobalRoute && <GlobalMenu isAdmin={isAdmin} />}

            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {[...langRoutes, ...globalRoutes].map(({ path, page: Page, isPrivate, isShowHeader, footerType, children }, idx) => {
                        const Layout = isShowHeader ? Default : Fragment;

                        const element = (
                            <Layout footerType={footerType}>
                                <Page setIsAdmin={setIsAdmin} />
                            </Layout>
                        );

                        return (
                            <Route
                                key={idx}
                                path={path}
                                element={
                                    isPrivate ? (
                                        <ProtectedRoute isAllowed={isAdmin}>
                                            {element}
                                        </ProtectedRoute>
                                    ) : (
                                        element
                                    )
                                }
                            >
                                {children && children.map((child, cIdx) => (
                                    <Route
                                        key={cIdx}
                                        path={child.path}
                                        element={<child.page setIsAdmin={setIsAdmin} />}
                                    />
                                ))}
                            </Route>
                        );
                    })}
                </Routes>
            </Suspense>
        </>
    );
}

function App() {
    const getInitialAdminState = () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                return parsedUser?.role === 'admin';
            }
            return false;
        } catch (error) {
            console.error('Lỗi khi parse user từ localStorage:', error);
            return false;
        }
    };

    const [isAdmin, setIsAdmin] = useState(getInitialAdminState());

    return (
        <Router>
            <AppContent isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        </Router>
    );
}

export default App;