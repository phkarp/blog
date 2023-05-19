import { createSlice } from '@reduxjs/toolkit';

import { User } from '../types/user-types';

import { fetchGetToken, fetchGetUser, fetchNewUser, fetchUpdateUser } from './userThunk';

interface InitialState {
  logged: boolean;
  user: User;
  regError: { email?: string; username?: string } | false;
  logError: { 'email or password': string } | false;
  editError: { email?: string; username?: string } | false;
}

const initialUser = {
  token: '',
  email: '',
  username: '',
};

const initialState: InitialState = {
  logged: false,
  user: initialUser,
  regError: false,
  logError: false,
  editError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clickLogOut: state => {
      state.logged = false;
      state.user = initialUser;
      localStorage.removeItem('user');
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchGetToken.fulfilled, (state, action) => {
        if (action.payload.errors) {
          state.logError = action.payload.errors;
        } else {
          localStorage.setItem(`user`, JSON.stringify(action.payload.user));
          state.logError = false;
          state.logged = true;
        }
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        const { user } = action.payload;

        if (!user.image) user.image = '';
        if (!user.bio) user.bio = '';
        user.logged = true;

        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        state.logged = true;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        if (action.payload.errors) {
          state.editError = action.payload.errors;
        } else {
          const { user } = action.payload;
          state.user = user;
          user.logged = true;
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
      .addCase(fetchNewUser.fulfilled, (state, action) => {
        if (action.payload.errors) {
          state.regError = action.payload.errors;
        } else {
          state.regError = false;
        }
      }),
});

export const { clickLogOut } = userSlice.actions;
export default userSlice.reducer;
