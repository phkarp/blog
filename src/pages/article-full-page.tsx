import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { fetchFullArticle } from '../store/articleThunk';
import { Loader } from '../components/loader/loader';
import { ArticleFull } from '../components/article-full/article-full';

export const ArticleFullPage = () => {
  const dispatch = useAppDispatch();

  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    dispatch(fetchFullArticle(slug));
  }, [slug]);

  const { fullCurrentArticle } = useAppSelector(state => state.articles);

  if (!fullCurrentArticle) {
    return <Loader />;
  }

  return <ArticleFull fullCurrentArticle={fullCurrentArticle} />;
};
