export type Author = { username: string; image: string; following: boolean };

export interface Article {
  author: Author;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export type ResponseArticles = {
  articles: Article[];
  articlesCount: number;
};
