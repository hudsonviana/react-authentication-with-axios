import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import Editor from './pages/Editor.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import PersistLogin from './components/PersistLogin.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/unauthorized', element: <Unauthorized /> },
      {
        element: <RequireAuth allowedRoles={['ADMIN']} />,
        children: [{ path: '/admin', element: <Admin /> }],
      },
      {
        element: <RequireAuth allowedRoles={['ADMIN', 'USER']} />,
        children: [{ path: '/editor', element: <Editor /> }],
      },

      // {
      //   element: <PersistLogin />,
      //   children: [
      //     {
      //       element: <RequireAuth allowedRoles={['ADMIN']} />,
      //       children: [{ path: '/admin', element: <Admin /> }],
      //     },
      //     {
      //       element: <RequireAuth allowedRoles={['ADMIN', 'USER']} />,
      //       children: [{ path: '/editor', element: <Editor /> }],
      //     },
      //   ],
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
