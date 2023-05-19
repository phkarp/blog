import { FC, useEffect } from 'react';
import { Pagination } from 'antd';

import { ArticleCard } from '../article-card/article-card';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { changePagination } from '../../store/articlesSlice';
import { Loader } from '../loader/loader';
import { fetchArticles } from '../../store/articleThunk';
import { Article } from '../../types/article-types';
import { ArticlesListProps } from '../../types/props-types';

import classes from './articles-list.module.scss';

export const ArticlesList: FC<ArticlesListProps> = props => {
  const { articles, articlesCount, currentPage, onChangePage } = props;

  const articleCards = articles.map((article, index) => (
    <ArticleCard article={article} fullArticle={false} key={index} />
  ));

  return (
    <div className={classes['article-list']}>
      {articleCards}
      <Pagination
        total={articlesCount ? articlesCount : 1}
        defaultCurrent={currentPage}
        showSizeChanger={false}
        defaultPageSize={5}
        hideOnSinglePage={true}
        onChange={onChangePage}
      />
    </div>
  );
};
