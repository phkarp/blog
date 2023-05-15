import { createAsyncThunk } from '@reduxjs/toolkit';

import { newUser, User } from '../types/user';
import { getUser, postNewUser, putUser } from '../services/get-user';

export const fetchNewUser = createAsyncThunk('content/fetchNewUser', async function (newUser: newUser) {
  const response = await postNewUser(newUser);
  console.log(response);
});

export const fetchGetUser = createAsyncThunk('content/fetchGetUser', async function (token: string) {
  const response = getUser(token);

  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});

export const fetchUpdateUser = createAsyncThunk(
  'content/fetchUpdateUser',
  async function (user: { user: User; token: string }) {
    const response = await putUser(user);
    console.log(response);
  }
);
