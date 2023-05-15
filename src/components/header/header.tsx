import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/hook';

import image1 from './Rectangle 1.svg';
import classes from './header.module.scss';

const Header: FC = () => {
  const { logged, username } = useAppSelector(state => state.user);

  if (logged) {
    return (
      <div className={classes.header}>
        <span>Realworld Blog</span>
        <ul>
          <li className={`${classes.selection} ${classes['created-article']}`}>
            <Link className={classes.link} to="/new" style={{ fontSize: 14 }}>
              Created article
            </Link>
          </li>
          <li className={classes.person}>
            <div className={classes.name}>{username ? username : 'ivi'}</div>
            <img src={String(image1)} />
          </li>
          <li className={classes['log-out']}>
            <Link className={`${classes.link}`} to="/sign-up">
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={classes.header}>
      <span>Realworld Blog</span>
      <ul>
        <li>
          <Link className={classes.link} to="/sign-in">
            Sign In
          </Link>
        </li>
        <li className={classes.selection}>
          <Link className={`${classes.link} ${classes['sign-up']}`} to="/sign-up">
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Header;
