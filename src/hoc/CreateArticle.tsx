import { FieldValues } from 'react-hook-form';

import { NewArticle } from '../components/new-article/new-article';
import { fetchCreateArticle } from '../store/articleThunk';
import { useAppDispatch } from '../hooks/hook';

export const CreateArticle = () => {
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    data.tagList = data.tagList.map((tag: { name: string }) => {
      return tag.name;
    });

    const dataRequire = {
      article: data,
    };

    dispatch(fetchCreateArticle(dataRequire));
  };

  return <NewArticle title="Create new article" submitHandler={onSubmit} />;
};
