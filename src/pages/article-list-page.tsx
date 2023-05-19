import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { fetchArticles } from '../store/articleThunk';
import { Loader } from '../components/loader/loader';
import { ArticlesList } from '../components/articles-list/articles-list';
import { changePagination } from '../store/articlesSlice';

export const ArticleListPage = () => {
  const { articles, offset, articlesCount, loading } = useAppSelector(state => state.articles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles(offset));
  }, []);

  const currentPage: number = offset / 5 + 1;

  const onChangePage = (page: number, pageSize: number) => {
    dispatch(changePagination({ page, pageSize }));
  };

  if (loading) return <Loader />;

  return (
    <ArticlesList
      currentPage={currentPage}
      onChangePage={onChangePage}
      articles={articles}
      articlesCount={articlesCount}
    />
  );
};
