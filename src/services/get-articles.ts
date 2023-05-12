import { ResponseArticles } from '../types/article';

export const getArticles = (offset = 0): Promise<ResponseArticles> => {
  return fetch(`https://blog.kata.academy/api/articles?limit=20&offset=${offset}`)
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.error(err));
};
