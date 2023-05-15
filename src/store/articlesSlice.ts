import { createSlice } from '@reduxjs/toolkit';

import { Article } from '../types/article';

import { fetchArticles, fetchFullArticle } from './articleThunk';

interface IInitialState {
  articles: Article[];
  articlesCount: number;
  offset: number;
  loading: boolean;
  errors: boolean;
  fullCurrentArticle?: Article;
}

const initialState: IInitialState = {
  articles: [],
  articlesCount: 0,
  offset: 0,
  loading: false,
  errors: false,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changePagination: (state, action) => {
      const { page, pageSize } = action.payload;
      state.offset = pageSize * (page - 1);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchArticles.pending, state => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, state => {
        state.errors = true;
      })
      .addCase(fetchFullArticle.fulfilled, (state, action) => {
        console.log(action.payload);
        state.fullCurrentArticle = action.payload;
      })
      .addCase(fetchFullArticle.rejected, () => {
        console.log('error');
      });
  },
});

export const { changePagination } = articlesSlice.actions;

export default articlesSlice.reducer;
