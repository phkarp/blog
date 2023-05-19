import { Article } from './article-types';

type ArticleFullProps = {
  fullCurrentArticle: Article;
};

type ArticlesListProps = {
  articles: Article[];
  currentPage: number;
  articlesCount: number;
  onChangePage: (page: number, pageSize: number) => void;
};

type EditProfileProps = {
  onSubmit: (data: any) => void;
  user: { username: string; email: string; image: string };
  editError: false | { email?: string; username?: string };
};

type DefaultValues = {
  title: string;
  description: string;
  body: string;
  tagList: { name: string }[];
  errors: object;
};

type NewArticleProps = {
  title: string;
  submitHandler: (data: any) => void;
  defaultValues?: DefaultValues;
};

type SignInProps = {
  onSubmit: (data: any) => void;
  logError: false | { 'email or password': string };
};

type SignUpProps = {
  onSubmit: (data: any) => void;
  regError: false | { email?: string; username?: string };
};

export type { ArticleFullProps, ArticlesListProps, EditProfileProps, NewArticleProps, SignInProps, SignUpProps };
