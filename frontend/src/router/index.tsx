import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { PrivateRoute } from '../routes/PrivateRoute';
import { ProductsPage } from '../pages/products/productsPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/register',
    element: <Register />,
  },
  {
    path: '/products',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <ProductsPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
