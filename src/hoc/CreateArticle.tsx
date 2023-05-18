import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { NewArticle } from '../components/new-article/new-article';
import { fetchCreateArticle } from '../store/articleThunk';
import { useAppDispatch } from '../hooks/hook';

export const CreateArticle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    data.tagList = data.tagList.map((tag: { name: string }) => {
      return tag.name;
    });

    const dataRequire = {
      article: data,
    };

    const response = await dispatch(fetchCreateArticle(dataRequire));
    // console.log(response);
    // if (response) {
    //   navigate(`/articles/${response.article?.slug}`);
    // }
  };

  return <NewArticle title="Create new article" submitHandler={onSubmit} />;
};
