import { Pagination } from 'antd';

import { SignUp } from '../sign-up/sign-up';
import Header from '../header/header';
import { ArticlesList } from '../articles-list/articles-list';
import { ArticleFull } from '../article-full/article-full';
import { SignIn } from '../sign-in/sign-in';
import { EditProfile } from '../edit-profile/edit-profile';
import { CreateArticle } from '../create-article/create-article';

import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.App}>
      <Header />
      {/*<ArticleFull />*/}
      {/*<SignUp />*/}
      {/*<SignIn />*/}
      {/*<EditProfile />*/}
      <CreateArticle />
      {/*<ArticlesList />*/}
      {/*<Pagination defaultCurrent={1} total={50} />*/}
    </div>
  );
}

export default App;
