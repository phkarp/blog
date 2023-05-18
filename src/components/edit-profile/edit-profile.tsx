import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { fetchUpdateUser } from '../../store/userThunk';
import { addServerErrors } from '../../utils/addServerErrors';

import classes from './edit-profile.module.scss';

export const EditProfile: FC = () => {
  const userFromStorage = localStorage.getItem('user')!;
  const { username, email, image } = JSON.parse(userFromStorage);

  const { editError } = useAppSelector(state => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ mode: 'all' });

  const dispatch = useAppDispatch();
  type EditedUser = {
    email: string;
    username: string;
    image: string;
    password?: string;
  };

  const onSubmit = async (data: any) => {
    const editedUser: EditedUser = {
      username: data.username,
      email: data.email,
      image: data.image,
    };

    if (data.password) {
      editedUser.password = data.password;
    }

    await dispatch(fetchUpdateUser({ user: editedUser }));
  };

  const classNameError = (field: string) => {
    return errors[field]?.message ? classes['input-error'] : '';
  };

  useEffect(() => {
    if (editError) {
      addServerErrors(editError, setError);
    }
  }, [editError]);

  return (
    <div className={classes['edit-profile']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit Profile</h2>
        <label>
          Username
          <input
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'The username field is required',
              minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
              maxLength: { value: 20, message: 'Your username needs to be no more than 20 characters.' },
              value: username,
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
              value: email,
            })}
            className={classNameError('email')}
          />
          <div className={classes.error}>{errors.email && <p>{errors.email.message?.toString() || 'Error!'}</p>}</div>
        </label>
        <label>
          New password
          <input
            type="password"
            placeholder="New password"
            {...register('password', {
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
          Avatar Image (url)
          <input
            type="text"
            placeholder="Avatar image"
            {...register('image', {
              pattern: {
                value: /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
                message: 'Please enter a valid url',
              },
              value: image,
            })}
            className={classNameError('image')}
          />
          <div className={classes.error}>{errors.image && <p>{errors.image.message?.toString() || 'Error!'}</p>}</div>
        </label>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};
