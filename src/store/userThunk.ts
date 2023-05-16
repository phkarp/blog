import { createAsyncThunk } from '@reduxjs/toolkit';

import { newUser, UserUpdate } from '../types/user';
import { getToken, getUserByToken, postNewUser, putUser } from '../services/get-user';

export const fetchNewUser = createAsyncThunk('content/fetchNewUser', async function (newUser: newUser) {
  const response = await postNewUser(newUser);
  console.log(response);
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

export const fetchUpdateUser = createAsyncThunk('content/fetchUpdateUser', async function (user: UserUpdate) {
  const response = await putUser(user);
  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});

export const fetchGetUser = createAsyncThunk('content/fetchGetUser', async function (token: string) {
  const response = await getUserByToken(token);

  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});
