import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import { ArticleCard } from '../article-card/article-card';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { Loader } from '../loader/loader';
import { fetchFullArticle } from '../../store/articleThunk';

import classes from './article-full.module.scss';

export const ArticleFull: FC = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(fetchFullArticle(slug));
    }
  }, [slug]);

  const { fullCurrentArticle } = useAppSelector(state => state.articles);

  if (!fullCurrentArticle) {
    return <Loader />;
  }

  return (
    <div className={classes.article}>
      <ArticleCard article={fullCurrentArticle} fullArticle={true} />
      <Markdown className={classes['article-body']}>
        {fullCurrentArticle.body ? fullCurrentArticle.body : 'описания нет'}
      </Markdown>
    </div>
  );
};
