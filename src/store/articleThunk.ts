import { createAsyncThunk } from '@reduxjs/toolkit';

import { ResponseArticles } from '../types/article';
import { getArticles } from '../services/get-articles';

export const fetchArticles = createAsyncThunk('content/fetchArticles', async function () {
  const response: ResponseArticles = await getArticles();

  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});
