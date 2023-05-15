import { FC, FormEvent, useState } from 'react';

import { useAppDispatch } from '../../hooks/hook';
import { fetchNewUser } from '../../store/userThunk';

import classes from './sign-up.module.scss';

export const SignUp: FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newUser = {
      user: {
        username,
        email,
        password,
      },
    };

    dispatch(fetchNewUser(newUser));
  };

  return (
    <div className={classes['sign-up']}>
      <form onSubmit={onSubmit}>
        <h2>Create new account</h2>
        <label>
          Username
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} value={username} />
        </label>
        <label>
          Email address
          <input type="email" placeholder="Email address" onChange={e => setEmail(e.target.value)} value={email} />
        </label>
        <label>
          Password
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
        </label>
        <label>
          Repeat Password
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPasswordRepeat(e.target.value)}
            value={passwordRepeat}
          />
        </label>
        <div className={classes['personal-information']}>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">I agree to the processing of my personal information</label>
        </div>
        <input type="submit" value="Create" />
        <span>
          Already have an account? <a>Sign In</a>.
        </span>
      </form>
    </div>
  );
};
