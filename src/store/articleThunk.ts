import { createAsyncThunk } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';

import { Article, ResponseArticles } from '../types/article-types';
import { deleteArticle, articles, getFullArticle, postArticle } from '../services/articles';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async function (offset: number) {
  const response: ResponseArticles = await articles(offset);

  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});

export const fetchFullArticle = createAsyncThunk('articles/fetchFullArticle', async function (slug: string) {
  const response: Article = await getFullArticle(slug);

  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});

export const fetchCreateArticle = createAsyncThunk('articles/fetchCreateArticle', async function (data: FieldValues) {
  return postArticle(data);
});

export const fetchDeleteArticle = createAsyncThunk('articles/fetchDeleteArticle', async function (slug: string) {
  return await deleteArticle(slug);
});

export const fetchEditedArticle = createAsyncThunk('articles/fetchFullArticle', async function (slug: string) {
  const response: Article = await getFullArticle(slug);

  if (response) {
    return response;
  }

  throw new Error(`Can't load content. Sever Error.`);
});
