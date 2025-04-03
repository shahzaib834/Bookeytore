import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import Book from './pages/Book';
import Member from './pages/Member';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Protected from './components/Protected';

function App() {
  //const userContext = useUserAuth();

  const AuthLayout = () => {
    return (
      <>
        <Outlet />
      </>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route
          index
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path='/book/:id'
          element={
            <Protected>
              <Book />
            </Protected>
          }
        />
        <Route
          path='/member/:id'
          element={
            <Protected>
              <Member />
            </Protected>
          }
        />
        <Route path='*' element={<NotFound />} />
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='logout' />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
