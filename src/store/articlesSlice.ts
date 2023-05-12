import { createSlice } from '@reduxjs/toolkit';

import { Article } from '../types/article';

import { fetchArticles } from './articleThunk';

interface IInitialState {
  articles: Article[];
  articlesCount: number;
}

const initialState: IInitialState = { articles: [], articlesCount: 0 };

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    });
  },
});

export default articlesSlice.reducer;
