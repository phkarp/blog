import { ResponseArticles } from '../types/article';

export const getArticles = (offset = 0): Promise<ResponseArticles> => {
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
