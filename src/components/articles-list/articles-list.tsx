import { FC } from 'react';

import { ArticleCard } from '../article-card/article-card';
import { useAppSelector } from '../../hooks/hook';

import classes from './articles-list.module.scss';

export const ArticlesList: FC = () => {
  const { articles } = useAppSelector(state => state.articles);

  const articleCards = articles.map((article, index) => <ArticleCard article={article} key={index} />);

  return <div className={classes['article-list']}>{articleCards}</div>;
};
