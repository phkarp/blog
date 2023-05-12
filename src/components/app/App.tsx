import { useState, useEffect, useContext, createContext } from 'react';
import { Pagination } from 'antd';

import { SignUp } from '../sign-up/sign-up';
import Header from '../header/header';
import { ArticlesList } from '../articles-list/articles-list';
import { ArticleFull } from '../article-full/article-full';
import { SignIn } from '../sign-in/sign-in';
import { EditProfile } from '../edit-profile/edit-profile';
import { CreateArticle } from '../create-article/create-article';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { fetchArticles } from '../../store/articleThunk';

import classes from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const countPages = useAppSelector(state => state.articles.articlesCount) / 20;

  return (
    <div className={classes.App}>
      <Header />
      {/*<ArticleFull />*/}
      {/*<SignUp />*/}
      {/*<SignIn />*/}
      {/*<EditProfile />*/}
      {/*<CreateArticle />*/}
      <ArticlesList />
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
}
export default App;
