import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from './layouts';
import { Login } from './modules/Auth';
import { Dashboard } from './modules/Dashboard';
import { AdminManagerList, UserManagerList } from './modules/User';
import Setting from './modules/Setting';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/user/user-manager',
        element: <UserManagerList />,
      },
      {
        path: '/user/admin-manager',
        element: <AdminManagerList />,
      },
      {
        path: '/settings',
        element: <Setting />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
