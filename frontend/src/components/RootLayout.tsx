import { BiLogOutCircle } from 'react-icons/bi';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useUserAuth from '../hooks/useUserAuth';
import { useEffect } from 'react';
import axios from 'axios';

const RootLayout = () => {
  const navigate = useNavigate();
  const userContext = useUserAuth();
  const userAuth: boolean = localStorage.getItem('userAuth') === 'true';

  const handleLogout = () => {
    userContext.setUserAuth(false, { username: '' }, '');
    localStorage.setItem('userAuth', 'false');
    localStorage.setItem('token', '');
    localStorage.setItem('user', JSON.stringify({}));
    navigate('/login');
  };

  useEffect(() => {
    if (!userAuth) {
      navigate('/login');
      return;
    }

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          // can check for refresh token here. and that fails then redirect to login
          navigate('/login');
        }
        return error;
      }
    );
  }, []);

  return (
    <>
      {/* navbar */}
      <div className='flex justify-around p-2 border-b-2 border-red-300'>
        <Link className='cursor-pointer text-2xl' to='/'>
          BookeyTore
        </Link>
        <BiLogOutCircle
          size={28}
          className='cursor-pointer'
          onClick={handleLogout}
        />
      </div>
      <Outlet />
    </>
  );
};

export default RootLayout;
