import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { addServerErrors } from '../../utils/addServerErrors';
import { EditProfileProps } from '../../types/props-types';

import classes from './edit-profile.module.scss';

export const EditProfile: FC<EditProfileProps> = props => {
  const { onSubmit, user, editError } = props;

  const { username, email, image } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ mode: 'all' });

  useEffect(() => {
    if (!editError) return;

    addServerErrors(editError, setError);
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
            className={errors.username ? classes['input-error'] : ''}
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
            className={errors.email ? classes['input-error'] : ''}
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
            className={errors.password ? classes['input-error'] : ''}
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
            className={errors.image ? classes['input-error'] : ''}
          />
          <div className={classes.error}>{errors.image && <p>{errors.image.message?.toString() || 'Error!'}</p>}</div>
        </label>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};
