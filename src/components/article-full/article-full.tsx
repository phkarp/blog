import { FC, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

import { ArticleCard } from '../article-card/article-card';
import { ArticleFullProps } from '../../types/props-types';

import classes from './article-full.module.scss';

export const ArticleFull: FC<ArticleFullProps> = props => {
  const { fullCurrentArticle } = props;

  return (
    <div className={classes.article}>
      <ArticleCard article={fullCurrentArticle} fullArticle={true} />
      <Markdown className={classes['article-body']}>
        {fullCurrentArticle.body ? fullCurrentArticle.body : 'описания нет'}
      </Markdown>
    </div>
  );
};
