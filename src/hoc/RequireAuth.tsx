import { useLocation, Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/hook';

const RequireAuth = (props: { children: any }) => {
  const location = useLocation();
  const { logged } = useAppSelector(state => state.user);
  const { children } = props;

  if (!logged) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
