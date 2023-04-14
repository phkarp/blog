import classes from './header.module.scss';

const Header = () => {
  return (
    <div className={classes.header}>
      <span>Realworld Blog</span>
      <ul>
        <li className={classes['link-active']}>
          <a className={classes.link}>Sign In</a>
        </li>
        <li>
          <a className={classes.link}>Sign Up</a>
        </li>
      </ul>
    </div>
  );
};
export default Header;
