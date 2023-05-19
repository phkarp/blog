import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchNewUser } from '../store/userThunk';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { SignUp } from '../components/sign-up/sign-up';

export const SignUpPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { regError } = useAppSelector(state => state.user);

  const onSubmit = async (data: any) => {
    const newUser = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };

    const dataRequire = await dispatch(fetchNewUser(newUser));
    if (!dataRequire.payload.errors) {
      navigate('/sign-in');
    }
  };

  return <SignUp onSubmit={onSubmit} regError={regError} />;
};
