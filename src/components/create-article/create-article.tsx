import { FC } from 'react';

import classes from './create-article.module.scss';

export const CreateArticle: FC = () => {
  return (
    <div className={classes['create-article']}>
      <form>
        <h2>Create new article</h2> <h2>или Edit article</h2>
        <label>
          Title
          <input type="text" placeholder="Title" />
        </label>
        <label>
          Short description
          <input type="text" placeholder="Short description" />
        </label>
        <label>
          Text
          <textarea placeholder="Password" />
        </label>
        <fieldset>
          <legend>Tags</legend>
          <label className={classes.tag}>
            <input type="text" placeholder="Tag" />
            <button className={classes.delete}>Delete</button>
            <button className={classes['add-tag']}>Add Tag</button>
          </label>
        </fieldset>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};
