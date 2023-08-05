import { BiLogOutCircle } from 'react-icons/bi';
import { Link, Outlet } from 'react-router-dom';

const RootLayout = () => {
  const handleLogout = () => {};

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
