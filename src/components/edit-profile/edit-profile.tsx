import { FC } from 'react';

import classes from './edit-profile.module.scss';

export const EditProfile: FC = () => {
  return (
    <div className={classes['edit-profile']}>
      <form>
        <h2>Edit Profile</h2>
        <label>
          Username
          <input type="text" placeholder="Username" />
        </label>
        <label>
          Email address
          <input type="email" placeholder="Email address" />
        </label>
        <label>
          New password
          <input type="password" placeholder="New password" />
        </label>
        <label>
          Avatar Image (url)
          <input type="password" placeholder="Avatar image" />
        </label>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};
