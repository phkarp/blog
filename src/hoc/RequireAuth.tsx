import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = (props: { children: any }) => {
  const location = useLocation();

  const { children } = props;

  const user = localStorage.getItem('user');
  if (user) {
    const userObj = JSON.parse(user);

    if (!userObj.logged) {
      return <Navigate to="/sign-in" state={{ from: location }} />;
    }
  }

  return children;
};

export { RequireAuth };
