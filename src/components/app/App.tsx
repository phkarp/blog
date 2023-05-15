import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../header/header';
// import { ArticlesList } from '../articles-list/articles-list';
import { ArticleFull } from '../article-full/article-full';
// import { SignIn } from '../sign-in/sign-in';
// import { EditProfile } from '../edit-profile/edit-profile';
// import { CreateArticle } from '../create-article/create-article';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { fetchArticles } from '../../store/articleThunk';
import { ArticlesList } from '../articles-list/articles-list';
import { SignIn } from '../sign-in/sign-in';
import { SignUp } from '../sign-up/sign-up';
import { EditProfile } from '../edit-profile/edit-profile';
import { CreateArticle } from '../create-article/create-article';

import classes from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();
  const { offset, loading, errors } = useAppSelector(state => state.articles);

  useEffect(() => {
    dispatch(fetchArticles(offset));
  }, [offset]);

  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<ArticleFull />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/new" element={<CreateArticle />} />
      </Routes>
      {errors ? 'Server Error' : null}
    </div>
  );
}
export default App;
