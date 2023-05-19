import { createAsyncThunk } from '@reduxjs/toolkit';

import { newUser, UserUpdate } from '../types/user-types';
import { getToken, getUserByToken, postNewUser, putUser } from '../services/user';

export const fetchNewUser = createAsyncThunk('user/fetchNewUser', async function (newUser: newUser) {
  return await postNewUser(newUser);
});

export const fetchGetToken = createAsyncThunk(
  'content/fetchGetToken',
  async function (user: {
    user: {
      email: string;
      password: string;
    };
  }) {
    const response = await getToken(user);

    if (response) {
      return response;
    }

    throw new Error(`Can't load content. Sever Error.`);
  }
);

export const fetchUpdateUser = createAsyncThunk('user/fetchUpdateUser', async function (user: UserUpdate) {
  const response = await putUser(user);

  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});

export const fetchGetUser = createAsyncThunk('user/fetchGetUser', async function (token: string) {
  const response = await getUserByToken(token);

  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});
