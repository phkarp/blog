import { FC, FormEvent, useState } from 'react';

import { useAppDispatch } from '../../hooks/hook';

import classes from './sign-in.module.scss';

export const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
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
          Don`t have an account? <a>Sign Up</a>.
        </span>
      </form>
    </div>
  );
};
