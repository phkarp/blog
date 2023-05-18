import { FieldValues } from 'react-hook-form';

import { ResponseArticles } from '../types/article';
import { User } from '../types/user';

export const articles = (offset = 0): Promise<ResponseArticles> => {
  return fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`)
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.error(err));
};

export const getFullArticle = (slug: string) => {
  return fetch(`https://blog.kata.academy/api/articles/${slug}`)
    .then(res => res.json())
    .then(res => res.article)
    .catch(err => console.error(err));
};

export const postArticle = (data: FieldValues) => {
  const userFromStorage = localStorage.getItem('user');
  if (userFromStorage) {
    const userFromStorageObj: User = JSON.parse(userFromStorage);

    const { token } = userFromStorageObj;

    return fetch(`https://blog.kata.academy/api/articles`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .catch(err => console.error(err));
  }
};

export const deleteArticle = (slug: string) => {
  const userFromStorage = localStorage.getItem('user');
  if (userFromStorage) {
    const userFromStorageObj: User = JSON.parse(userFromStorage);

    const { token } = userFromStorageObj;
    return fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(res => res.ok)
      .catch(err => console.error(err));
  }
};

export const updateArticle = async (slug: string, token: string, data: object) => {
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
