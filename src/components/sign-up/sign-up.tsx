import { FC, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '../../hooks/hook';
import { fetchNewUser } from '../../store/userThunk';

import classes from './sign-up.module.scss';

export const SignUp: FC = () => {
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordRepeat, setPasswordRepeat] = useState('');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    mode: 'all',
  });

  const onSubmit = (data: any) => {
    const newUser = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };

    dispatch(fetchNewUser(newUser));
    navigate('/sign-in');
  };

  const classNameError = (field: string) => {
    return errors[field]?.message ? classes['input-error'] : '';
  };

  return (
    <div className={classes['sign-up']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create new account</h2>
        <label>
          Username
          <input
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'The username field is required',
              minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
              maxLength: { value: 20, message: 'Your username needs to be no more than 20 characters.' },
            })}
            className={classNameError('username')}
          />
          <div className={classes.error}>
            {errors?.username && <p>{errors.username?.message?.toString() || 'Error!'}</p>}
          </div>
        </label>
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
        <label>
          Repeat Password
          <input
            type="password"
            placeholder="Password"
            {...register('passwordRepeat', {
              required: 'The password field is required',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: { value: 40, message: 'Your password needs to be no more than 40 characters.' },
              validate: value => {
                const { password } = getValues();
                return password === value || 'Passwords must match!';
              },
            })}
            className={classNameError('passwordRepeat')}
          />
          <div className={classes.error}>
            {errors.passwordRepeat && <p>{errors.passwordRepeat.message?.toString() || 'Error!'}</p>}
          </div>
        </label>
        <div className={classes['personal-information']}>
          <input
            type="checkbox"
            id="checkbox"
            {...register('agree', {
              required: 'The agree field is required',
            })}
          />
          <label htmlFor="checkbox">I agree to the processing of my personal information</label>
        </div>
        <div style={{ textAlign: 'left' }} className={classes.error}>
          {errors.agree && <p>{errors.agree.message?.toString() || 'Error!'}</p>}
        </div>
        <input type="submit" value="Create" />
        <span>
          Already have an account?{' '}
          <Link to="/sign-in" style={{ textDecoration: 'none' }}>
            Sign In
          </Link>
          .
        </span>
      </form>
    </div>
  );
};
