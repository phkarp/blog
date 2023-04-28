import { FC } from 'react';

import classes from './sign-in.module.scss';

export const SignIn: FC = () => {
  return (
    <div className={classes['sign-in']}>
      <form>
        <h2>Sign In</h2>
        <label>
          Email address
          <input type="email" placeholder="Email address" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Password" />
        </label>
        <input type="submit" value="Login" />
        <span>
          Don`t have an account? <a>Sign Up</a>.
        </span>
      </form>
    </div>
  );
};
