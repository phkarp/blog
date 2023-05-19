import { FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { NewArticleProps } from '../../types/props-types';

import classes from './new-article.module.scss';

export const NewArticle: FC<NewArticleProps> = props => {
  const { title, submitHandler, defaultValues } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'all',
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  const tags = fields.map((field, i) => {
    return (
      <label className={classes.tag} key={field.id}>
        <input type="text" placeholder="Tag" {...register(`tagList.${i}.name`, { required: true })} />
        <button className={classes.delete} onClick={() => remove(i)}>
          Delete
        </button>
      </label>
    );
  });

  const clickAddTag = (e: any) => {
    e.preventDefault();
    append({ name: '' });
  };

  return (
    <div className={classes['new-article']}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <h2>{title}</h2>
        <label>
          Title
          <input
            type="text"
            placeholder="Title"
            {...register('title', {
              required: 'The field title is required',
              maxLength: { value: 250, message: 'The title needs to be no more than 250 characters.' },
            })}
            className={errors.title ? classes['input-error'] : ''}
          />
          <div className={classes.error}>{errors?.title && <p>{errors.title?.message?.toString() || 'Error!'}</p>}</div>
        </label>
        <label>
          Short description
          <input
            type="text"
            placeholder="Short description"
            {...register('description', {
              required: 'The field short description is required',
            })}
            className={errors.description ? classes['input-error'] : ''}
          />
          <div className={classes.error}>
            {errors?.description && <p>{errors.description?.message?.toString() || 'Error!'}</p>}
          </div>
        </label>
        <label>
          Text
          <textarea
            placeholder="Text"
            {...register('body', {
              required: 'The field text is required',
            })}
            className={errors.body ? classes['input-error'] : ''}
          />
          <div className={classes.error}>{errors?.body && <p>{errors.body?.message?.toString() || 'Error!'}</p>}</div>
        </label>
        <fieldset>
          <legend>Tags</legend>
          {tags}
          <button className={`${classes['add-tag']} ${tags.length ? classes['add-last'] : ''}`} onClick={clickAddTag}>
            Add Tag
          </button>
          <div className={`${classes.error} ${classes.tags}`}>
            {errors.tagList && <p>{'The field tag is required!'}</p>}
          </div>
        </fieldset>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};
