import { FC, FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/hook';
import { fetchGetToken } from '../../store/userThunk';

import classes from './sign-in.module.scss';

export const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const dataOfUser = {
      user: {
        email,
        password,
      },
    };
    dispatch(fetchGetToken(dataOfUser));
    navigate(fromPage);
  };

  return (
    <div className={classes['sign-in']}>
      <form onSubmit={onSubmit}>
        <h2>Sign In</h2>
        <label>
          Email address
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Login" />
        <span>
          Don`t have an account?{' '}
          <Link to="/sign-up" style={{ textDecoration: 'none' }}>
            Sign Up
          </Link>
          .
        </span>
      </form>
    </div>
  );
};
