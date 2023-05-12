import { createAsyncThunk } from '@reduxjs/toolkit';

import { ResponseArticles } from '../types/article';
import { getArticles } from '../services/get-articles';

export const fetchArticles = createAsyncThunk('content/fetchArticles', async function (offset: number) {
  const response: ResponseArticles = await getArticles(offset);

  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});
