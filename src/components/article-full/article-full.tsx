import { FC, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

import { ArticleCard } from '../article-card/article-card';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { Loader } from '../loader/loader';
import { getFullArticle } from '../../services/get-articles';
import { fetchFullArticle } from '../../store/articleThunk';

export const ArticleFull: FC = () => {
  const dispatch = useAppDispatch();
  const { articles, fullCurrentArticle } = useAppSelector(state => state.articles);

  if (!articles.length) return <Loader />;

  const currentArticle = articles[19];

  // useEffect(() => {
  //   dispatch(fetchFullArticle(currentArticle.slug));
  // }, [fullCurrentArticle]);
  //
  // if (!fullCurrentArticle) {
  //   return <Loader />;
  // }

  return (
    <div>
      <ArticleCard article={currentArticle} />
      <div>{fullCurrentArticle ? fullCurrentArticle.description : 'описания нет'}</div>
    </div>
  );
};
