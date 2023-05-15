import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import { format } from 'date-fns';

import { Article } from '../../types/article';

import classes from './article-card.module.scss';
import like from './heart.svg';

export const ArticleCard: FC<{ article: Article }> = props => {
  const { article } = props;
  const { favoritesCount, tagList, description, title, author, createdAt, slug } = article;
  const { username, image } = author;

  const tags = tagList.map((tag, index) => <Tag key={index}>{tag}</Tag>);

  const dateCreated = format(new Date(createdAt), 'LLLL d, yyyy');

  return (
    <div className={classes.article}>
      <div className={classes['article-body']}>
        <div className={classes['header']}>
          <Link to={`/articles/${slug}`} style={{ textDecoration: 'none' }}>
            {title}
          </Link>
          <div className={classes.heart}></div>
          <img src={String(like)} />
          <div>{favoritesCount}</div>
        </div>
        <div>{tags}</div>
        <p>{description}</p>
      </div>
      <div className={classes['person-info']}>
        <div>
          <div className={classes.name}>{username}</div>
          <div className={classes.date}>{dateCreated}</div>
        </div>
        <img src={String(image)} />
      </div>
    </div>
  );
};
