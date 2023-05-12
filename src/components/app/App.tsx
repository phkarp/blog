import { useState, useEffect, useContext, createContext } from 'react';
import { Pagination, Alert, Space, Spin } from 'antd';

import { SignUp } from '../sign-up/sign-up';
import Header from '../header/header';
import { ArticlesList } from '../articles-list/articles-list';
import { ArticleFull } from '../article-full/article-full';
import { SignIn } from '../sign-in/sign-in';
import { EditProfile } from '../edit-profile/edit-profile';
import { CreateArticle } from '../create-article/create-article';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { fetchArticles } from '../../store/articleThunk';
import { changePagination } from '../../store/articlesSlice';
import { Loader } from '../loader/loader';

import classes from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();
  const { offset, articlesCount, loading, errors } = useAppSelector(state => state.articles);

  useEffect(() => {
    dispatch(fetchArticles(offset));
  }, [offset]);

  const currentPage: number = offset / 20 + 1;

  return (
    <div className={classes.App}>
      <Header />
      {/*<ArticleFull />*/}
      {/*<SignUp />*/}
      {/*<SignIn />*/}
      {/*<EditProfile />*/}
      {/*<CreateArticle />*/}
      {loading ? <Loader /> : <ArticlesList />}
      {errors ? 'Server Error' : null}
      <Pagination
        total={articlesCount ? articlesCount : 1}
        defaultCurrent={currentPage}
        showSizeChanger={false}
        defaultPageSize={20}
        hideOnSinglePage={true}
        onChange={(page, pageSize) => dispatch(changePagination({ page, pageSize }))}
      />
    </div>
  );
}
export default App;
