import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SignIn } from '../components/sign-in/sign-in';
import { fetchGetToken } from '../store/userThunk';
import { useAppDispatch, useAppSelector } from '../hooks/hook';

export const SignInPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { logError } = useAppSelector(state => state.user);

  const fromPage = location.state?.from?.pathname || '/';

  const onSubmit = async (data: any) => {
    const dataOfUser = {
      user: {
        email: data.email,
        password: data.password,
      },
    };

    const dataRequired = await dispatch(fetchGetToken(dataOfUser));

    if (!dataRequired.payload.errors) navigate(fromPage);
  };

  return <SignIn onSubmit={onSubmit} logError={logError} />;
};
