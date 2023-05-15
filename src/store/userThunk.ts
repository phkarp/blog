import { createAsyncThunk } from '@reduxjs/toolkit';

import { newUser, User } from '../types/user';

export const fetchNewUser = createAsyncThunk('content/fetchNewUser', async function (newUser: newUser) {
  console.log(newUser);
  const response = await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(newUser),
  });

  const result = await response.json();

  console.log(result);
});

export const fetchGetUser = createAsyncThunk('content/fetchGetUser', async function (token: string) {
  const response = await fetch('https://blog.kata.academy/api/users', {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});

export const fetchUpdateUser = createAsyncThunk(
  'content/fetchUpdateUser',
  async function (user: { user: User; token: string }) {
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: user.token },
      body: JSON.stringify(user.user),
    });

    const result = await response.json();

    console.log(result);
  }
);
