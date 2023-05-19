import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { SignInProps } from '../../types/props-types';

import classes from './sign-in.module.scss';

export const SignIn: FC<SignInProps> = props => {
  const { onSubmit, logError } = props;

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'all',
  });

  useEffect(() => {
    if (!logError) return;

    setError('password', {
      type: 'server',
      message: 'email or password is invalid',
    });
  }, [logError]);

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
            className={errors.email ? classes['input-error'] : ''}
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
            className={errors.password ? classes['input-error'] : ''}
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
