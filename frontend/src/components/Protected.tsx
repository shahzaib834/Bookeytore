import { Navigate } from 'react-router-dom';
import useUserAuth from '../hooks/useUserAuth';
function Protected({ children }: { children: any }) {
  console.log('here');
  const userContext = useUserAuth();
  const userAuth: boolean = localStorage.getItem('userAuth') === 'true';

  if (userAuth && !userContext.userAuth) {
    const user = JSON.parse(localStorage.getItem('user') || '') || {};
    // const user_id = localStorage.getItem('user_id');
    const token: string = localStorage.getItem('token') || '';
    userContext.setUserAuth(true, user, token);
  }

  if (!userContext.userAuth || !userAuth || !userContext.token) {
    return <Navigate to='/login' replace />;
  }
  return children;
}
export default Protected;
