import { Pagination } from 'antd';

import { CreateAccount } from '../create-account/create-account';
import Header from '../header/header';
import { ArticlesList } from '../articles-list/articles-list';

import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.App}>
      <Header />
      <CreateAccount />
      {/*<ArticlesList />*/}
      {/*<Pagination defaultCurrent={1} total={50} />*/}
    </div>
  );
}

export default App;
