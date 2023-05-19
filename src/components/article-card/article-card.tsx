import { FC, ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import { format } from 'date-fns';

import { Article } from '../../types/article-types';
import { useAppDispatch } from '../../hooks/hook';
import { fetchDeleteArticle } from '../../store/articleThunk';
import { deleteFavorite, postFavorite } from '../../services/articles';
import { updateArticle } from '../../store/articlesSlice';

import classes from './article-card.module.scss';
import like from './heart.svg';
import redLike from './red-heart.svg';
import attention from './exclamation-circle.svg';

export const ArticleCard: FC<{ article: Article; fullArticle: boolean }> = props => {
  const { article, fullArticle } = props;
  const { tagList, description, title, author, createdAt, slug, favoritesCount, favorited } = article;
  const { username, image } = author;

  const [visiblePopUp, setVisiblePopUp] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  let buttons: ReactNode | null = null;

  const onDelete = (e: any) => {
    e.preventDefault();

    setVisiblePopUp(!visiblePopUp);
  };

  const onFavorited = async () => {
    console.log(1);
    const userFromLS = localStorage.getItem('user');
    if (!userFromLS) {
      navigate('/sign-in');
      return;
    }

    const user = JSON.parse(userFromLS);
    const { token } = user;

    const response = favorited
      ? await deleteFavorite(slug, token).catch(err => console.error(err))
      : await postFavorite(slug, token).catch(err => console.error(err));

    if (!response) return;

    const { article } = response;
    dispatch(updateArticle({ slug, article }));
  };

  const onClickNo = () => {
    setVisiblePopUp(false);
  };

  const onClickYes = async () => {
    const response = await dispatch(fetchDeleteArticle(slug));
    if (!response.payload) return;
    navigate('/');
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
          {visiblePopUp ? (
            <div className={classes['are-you-sure']}>
              <div className={classes.triangle}></div>
              <img src={String(attention)} alt="" />
              <span>Are you sure to delete this article?</span>
              <div className={classes['button-yes-no']}>
                <button className={classes.no} onClick={onClickNo}>
                  No
                </button>
                <button className={classes.yes} onClick={onClickYes}>
                  Yes
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
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
          <img src={favorited ? String(redLike) : String(like)} alt="" className={classes.like} onClick={onFavorited} />
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
