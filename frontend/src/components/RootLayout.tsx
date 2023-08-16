import { BiLogOutCircle } from 'react-icons/bi';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useUserAuth from '../hooks/useUserAuth';

const RootLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userContext.setUserAuth(false, { username: '' }, '');
    localStorage.setItem('userAuth', 'false');
    localStorage.setItem('user', JSON.stringify({}));
    navigate('/login');
  };

  const userContext = useUserAuth();
  return (
    <>
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
