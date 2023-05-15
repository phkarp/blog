import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  logged: boolean;
  username: string;
  image: string;
}

const initialState: InitialState = {
  logged: true,
  username: '',
  image: '',
};

const userSlice = createSlice({ name: 'user', initialState, reducers: {} });

export default userSlice.reducer;
