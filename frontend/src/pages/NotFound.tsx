import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-1'>
      <p className='text-3xl'>Page Not Found</p>
      <div className='flex gap-1'>Navigate to<Link to="/" className='underline text-blue-400'>Home</Link></div>
    </div>
  );
};

export default NotFound;
