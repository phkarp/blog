import { createSlice } from '@reduxjs/toolkit';

import { Article } from '../types/article-types';

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
    updateArticle: (state, action) => {
      state.articles = state.articles.map(article => {
        if (article.slug === action.payload.slug) {
          return action.payload.article;
        }
        return article;
      });
      state.fullCurrentArticle = action.payload.article;
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
        state.fullCurrentArticle = action.payload;
      });
  },
});

export const { changePagination, updateArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
