import { createAsyncThunk } from '@reduxjs/toolkit';

import { Article, ResponseArticles } from '../types/article';
import { getArticles, getFullArticle } from '../services/get-articles';

export const fetchArticles = createAsyncThunk('content/fetchArticles', async function (offset: number) {
  const response: ResponseArticles = await getArticles(offset);

  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});

export const fetchFullArticle = createAsyncThunk('content/fetchFullArticle', async function (slug: string) {
  const response: Article = await getFullArticle(slug);

  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});
