import { Navigate } from 'react-router-dom';
import useUserAuth from '../hooks/useUserAuth';
function Protected({ children }: { children: any }) {
  const userContext = useUserAuth();
  const userAuth: boolean = localStorage.getItem('userAuth') === 'true';

  if (!userContext.userAuth && !userAuth && !userContext.token) {
    return <Navigate to='/login' replace />;
  }
  return children;
}
export default Protected;
