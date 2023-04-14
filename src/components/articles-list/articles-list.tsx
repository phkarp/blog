import { FC } from 'react';

import { ArticleCard } from '../article-card/article-card';

import classes from './articles-list.module.scss';

export const ArticlesList: FC = () => {
  return (
    <div className={classes['article-list']}>
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </div>
  );
};
