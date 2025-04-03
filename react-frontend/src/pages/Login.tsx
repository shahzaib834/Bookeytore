import { useState } from 'react';
import useUserAuth from '../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import { postData } from '../api/POST';
import Swal from 'sweetalert2';
import Loader from '../components/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const userContext = useUserAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    const user = {
      username: email,
      password,
    };
    const response = await postData('auth/login', user);

    if (response?.success) {
      userContext.setUserAuth(true, response?.userData, response?.token);
      localStorage.setItem('userAuth', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.token);

      navigate('/');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Logged in succesfull',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Logged in failed',
        showConfirmButton: false,
        timer: 1000,
      });
    }
    setIsLoading(false);
  };
  return (
    <div className='absolute left-[50%] top-[50%] border p-5 translate-x-[-50%] translate-y-[-50%] w-[50vw] h-[50vh]'>
      <Loader visible={isLoading} />
      <p className='text-2xl'>Login</p>
      <div className='flex flex-col gap-5 mt-[8vh]'>
        <input
          id='email'
          className='form-input h-10 pl-2 bg-white text-black'
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          id='password'
          className='form-input h-10 pl-2 bg-white text-black'
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          className='h-10 bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-md inline-flex items-center justify-center border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out'
          onClick={handleLogin}
        >
          Login
        </button>
        <p className='cursor-pointer self-end'>
          Don't have an account. Request Access ?
        </p>
      </div>
    </div>
  );
};

export default Login;
