import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { fetchArticles } from '../../store/articleThunk';
import { fetchGetUser } from '../../store/userThunk';
import { RequireAuth } from '../../hoc/RequireAuth';
import { CreateArticlePage } from '../../pages/create-article-page';
import { EditArticlePage } from '../../pages/edit-article-page';
import { SignInPage } from '../../pages/sign-in-page';
import { SignUpPage } from '../../pages/sign-up-page';
import { ArticleListPage } from '../../pages/article-list-page';
import { ArticleFullPage } from '../../pages/article-full-page';
import { EditProfilePage } from '../../pages/edit-profile-page';

import classes from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();
  const { offset, errors } = useAppSelector(state => state.articles);
  const { logged, logError } = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchArticles(offset));
  }, [offset]);

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');

    if (!userFromStorage) return;

    const { token } = JSON.parse(userFromStorage);

    if (!token) return;

    dispatch(fetchGetUser(token));
  }, [logged, logError]);

  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleListPage />} />
        <Route path="/articles" element={<ArticleListPage />} />
        <Route path="/articles/:slug" element={<ArticleFullPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <EditProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/new-article"
          element={
            <RequireAuth>
              <CreateArticlePage />
            </RequireAuth>
          }
        />
        <Route
          path="/articles/:slug/edit"
          element={
            <RequireAuth>
              <EditArticlePage />
            </RequireAuth>
          }
        />
      </Routes>
      {errors ? 'Server Error' : null}
    </div>
  );
}
export default App;
