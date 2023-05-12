import { ResponseArticles } from '../types/article';

export const getArticles = (): Promise<ResponseArticles> => {
  return fetch('https://blog.kata.academy/api/articles?limit=20')
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.error(err));
};
