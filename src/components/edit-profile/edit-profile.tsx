import { FC, FormEvent, useState } from 'react';

import { useAppDispatch } from '../../hooks/hook';
import { fetchUpdateUser } from '../../store/userThunk';

import classes from './edit-profile.module.scss';

export const EditProfile: FC = () => {
  const userFromStorage = localStorage.getItem('user')!;
  const { username, email, image } = JSON.parse(userFromStorage);

  const dispatch = useAppDispatch();

  const [usernameLocal, setUsernameLocal] = useState(username);
  const [emailLocal, setEmailLocal] = useState(email);
  const [passwordLocal, setPasswordLocal] = useState('');
  const [imageLocal, setImageLocal] = useState(image);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (passwordLocal) {
      const editedUser = {
        username: usernameLocal,
        email: emailLocal,
        password: passwordLocal,
        image: imageLocal,
      };
      dispatch(fetchUpdateUser({ user: editedUser }));
    } else {
      const editedUser = {
        username: usernameLocal,
        email: emailLocal,
        image: imageLocal,
      };
      dispatch(fetchUpdateUser({ user: editedUser }));
    }
  };

  return (
    <div className={classes['edit-profile']}>
      <form onSubmit={onSubmit}>
        <h2>Edit Profile</h2>
        <label>
          Username
          <input
            type="text"
            placeholder="Username"
            value={usernameLocal}
            onChange={e => setUsernameLocal(e.target.value)}
          />
        </label>
        <label>
          Email address
          <input
            type="email"
            placeholder="Email address"
            value={emailLocal}
            onChange={e => setEmailLocal(e.target.value)}
          />
        </label>
        <label>
          New password
          <input
            type="password"
            placeholder="New password"
            value={passwordLocal}
            onChange={e => setPasswordLocal(e.target.value)}
          />
        </label>
        <label>
          Avatar Image (url)
          <input
            type="text"
            placeholder="Avatar image"
            value={imageLocal}
            onChange={e => setImageLocal(e.target.value)}
          />
        </label>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};
