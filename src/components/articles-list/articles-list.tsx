import { FC, useEffect } from 'react';
import { Pagination } from 'antd';

import { ArticleCard } from '../article-card/article-card';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { changePagination } from '../../store/articlesSlice';
import { Loader } from '../loader/loader';
import { fetchArticles } from '../../store/articleThunk';

import classes from './articles-list.module.scss';

export const ArticlesList: FC = () => {
  const { articles, offset, articlesCount, loading } = useAppSelector(state => state.articles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles(offset));
  }, []);

  const currentPage: number = offset / 5 + 1;

  const articleCards = articles.map((article, index) => (
    <ArticleCard article={article} fullArticle={false} key={index} />
  ));

  if (loading) return <Loader />;

  return (
    <div className={classes['article-list']}>
      {articleCards}
      <Pagination
        total={articlesCount ? articlesCount : 1}
        defaultCurrent={currentPage}
        showSizeChanger={false}
        defaultPageSize={5}
        hideOnSinglePage={true}
        onChange={(page, pageSize) => dispatch(changePagination({ page, pageSize }))}
      />
    </div>
  );
};
