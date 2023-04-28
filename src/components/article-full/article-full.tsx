import { FC } from 'react';

import { ArticleCard } from '../article-card/article-card';

export const ArticleFull: FC = () => {
  return (
    <div>
      <ArticleCard />
      <div>Текст статьи</div>
    </div>
  );
};
