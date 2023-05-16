import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { clickLogOut } from '../../store/userSlice';

import image1 from './Rectangle 1.svg';
import classes from './header.module.scss';

const Header: FC = () => {
  const { logged, user } = useAppSelector(state => state.user);
  const { username, image } = user;
  const dispatch = useAppDispatch();

  if (logged) {
    return (
      <div className={classes.header}>
        <span>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            Realworld Blog
          </Link>
        </span>
        <ul>
          <li className={`${classes.selection} ${classes['created-article']}`}>
            <Link className={classes.link} to="/new" style={{ fontSize: 14 }}>
              Created article
            </Link>
          </li>
          <li>
            <Link to="/profile" className={classes.person}>
              <div className={classes.name}>{username ? username : 'Noname'}</div>
              <img src={String(image ? image : image1)} />
            </Link>
          </li>
          <li className={classes['log-out']}>
            <Link className={`${classes.link}`} to="/sign-in" onClick={() => dispatch(clickLogOut())}>
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={classes.header}>
      <span>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          Realworld Blog
        </Link>
      </span>
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
