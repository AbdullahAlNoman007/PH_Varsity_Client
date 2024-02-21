import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { adminPaths } from './admin.routes';
import { routeGenerator } from '../utils/routesGenerator';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { ManagerPaths } from './manager.routes';
import { sellerPaths } from './seller.routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/superAdmin',
    element: (
      <ProtectedRoute role='superAdmin'>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: '/manager',
    element: (
      <ProtectedRoute role='manager'>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(ManagerPaths),
  },
  {
    path: '/seller',
    element: (
      <ProtectedRoute role='seller'>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(sellerPaths),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  }
]);

export default router;
