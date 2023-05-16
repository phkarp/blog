import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

import { User } from '../types/user';

import { fetchGetToken, fetchGetUser, fetchUpdateUser } from './userThunk';

interface InitialState {
  logged: boolean;
  user: User;
}

const initialUser = {
  token: '',
  email: '',
  username: '',
};

const initialState: InitialState = {
  logged: false,
  user: initialUser,
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
        if (action.payload.user) {
          localStorage.setItem(`user`, JSON.stringify(action.payload.user));
          state.logged = true;
        } else {
          console.log('Повторите попытку, пользователь с такими данными не найден');
        }
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        const { user } = action.payload;

        if (!user.image) user.image = '';
        if (!user.bio) user.bio = '';

        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        state.logged = true;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      }),
});
export const { clickLogOut } = userSlice.actions;
export default userSlice.reducer;
