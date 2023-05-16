import { FC, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { fetchGetToken } from '../../store/userThunk';

import classes from './sign-in.module.scss';

export const SignIn: FC = () => {
  const dispatch = useAppDispatch();

  const { logError } = useAppSelector(state => state.user);

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'all',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  const onSubmit = async (data: any) => {
    const dataOfUser = {
      user: {
        email: data.email,
        password: data.password,
      },
    };

    const dataRequired = await dispatch(fetchGetToken(dataOfUser));

    if (!dataRequired.payload.errors) {
      navigate(fromPage);
    }
  };

  useEffect(() => {
    if (logError) {
      setError('password', {
        type: 'server',
        message: 'email or password is invalid',
      });
    }
  }, [logError]);

  const classNameError = (field: string) => {
    return errors[field]?.message ? classes['input-error'] : '';
  };

  return (
    <div className={classes['sign-in']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In</h2>
        <label>
          Email address
          <input
            type="email"
            placeholder="Email address"
            {...register('email', {
              required: 'The email field is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            className={classNameError('email')}
          />
          <div className={classes.error}>{errors.email && <p>{errors.email.message?.toString() || 'Error!'}</p>}</div>
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'The password field is required',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: { value: 40, message: 'Your password needs to be no more than 40 characters.' },
            })}
            className={classNameError('password')}
          />
          <div className={classes.error}>
            {errors.password && <p>{errors.password.message?.toString() || 'Error!'}</p>}
          </div>
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
