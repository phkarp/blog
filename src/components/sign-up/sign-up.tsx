import { FC } from 'react';

import classes from './sign-up.module.scss';

export const SignUp: FC = () => {
  return (
    <div className={classes['sign-up']}>
      <form>
        <h2>Create new account</h2>
        <label>
          Username
          <input type="text" placeholder="Username" />
        </label>
        <label>
          Email address
          <input type="email" placeholder="Email address" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Password" />
        </label>
        <label>
          Repeat Password
          <input type="password" placeholder="Password" />
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
