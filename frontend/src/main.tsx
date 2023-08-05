import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  Outlet,
} from 'react-router-dom';
import Home from './pages/Home';
import Book from './pages/Book';
import Member from './pages/Member';
import Login from './pages/Login';
import RootLayout from './RootLayout';

const AuthLayout = () => {
  return <><Outlet /></>;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/book' element={<Book />} />
      <Route path='/member' element={<Member />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path='login' element={<Login />}/>
        <Route path='logout' />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
