import { FC } from 'react';
import { Tag } from 'antd';

import classes from './article-card.module.scss';
import like from './heart.svg';
import avatar from './Rectangle 1.svg';

export const ArticleCard: FC = () => {
  return (
    <div className={classes.article}>
      <div className={classes['article-body']}>
        <div className={classes['header']}>
          <a>Some article title</a>
          <div className={classes.heart}></div>
          <img src={String(like)} />
          <div>12</div>
        </div>
        <div>
          <Tag>tag 1</Tag>
          <Tag>tag 2</Tag>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>
      <div className={classes['person-info']}>
        <div>
          <div className={classes.name}>John Doe</div>
          <div className={classes.date}>March 5, 2020 </div>
        </div>
        <img src={String(avatar)} />
      </div>
    </div>
  );
};
