import { FC, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import { format } from 'date-fns';

import { Article } from '../../types/article';
import { useAppDispatch } from '../../hooks/hook';
import { fetchDeleteArticle } from '../../store/articleThunk';

import classes from './article-card.module.scss';
import like from './heart.svg';

export const ArticleCard: FC<{ article: Article; fullArticle: boolean }> = props => {
  const { article, fullArticle } = props;

  const { favoritesCount, tagList, description, title, author, createdAt, slug } = article;
  const { username, image } = author;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  let buttons: ReactNode | null = null;

  const onDelete = async (e: any) => {
    e.preventDefault();
    const response = await dispatch(fetchDeleteArticle(slug));
    if (response.payload) {
      navigate('/');
    }
  };

  const user = localStorage.getItem('user');
  if (user) {
    const userObj = JSON.parse(user);
    if (fullArticle && userObj.username === username) {
      buttons = (
        <div className={classes.buttons}>
          <button className={classes.delete} onClick={onDelete}>
            Delete
          </button>
          <Link className={classes.edit} to={`/articles/${slug}/edit`}>
            Edit
          </Link>
        </div>
      );
    }
  }

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
          <img src={String(like)} alt="" />
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
        <img src={String(image)} alt="" />
        {buttons}
      </div>
    </div>
  );
};
