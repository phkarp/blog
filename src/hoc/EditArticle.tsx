import { FieldValues } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { NewArticle } from '../components/new-article/new-article';
import { getFullArticle, updateArticle } from '../services/articles';
import { Loader } from '../components/loader/loader';
import { UserLocalStorage } from '../types/user';

export const EditArticle = () => {
  const [currentArticle, setCurrentArticle] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async (slug: string) => {
      const article = await getFullArticle(slug);

      if (article) {
        article.tagList = article.tagList.map((tag: string) => {
          return { name: tag };
        });

        setCurrentArticle(article);
      }
    };

    fetchUser(slug!).catch(err => console.error(err));
  }, []);

  const onSubmit = async (data: FieldValues) => {
    const userFromLS = localStorage.getItem('user');
    const newData = {
      article: {
        title: data.title,
        body: data.body,
        description: data.description,
        tagList: data.tagList.map((tag: { name: string }) => tag.name),
      },
    };
    if (userFromLS) {
      const user: UserLocalStorage = JSON.parse(userFromLS);

      if (slug) {
        await updateArticle(slug, user.token, newData).catch(err => console.error(err));
      }
    }
  };

  if (currentArticle) {
    const { author } = currentArticle;
    const { username } = author;
    const userFromLS = localStorage.getItem('user');
    if (userFromLS) {
      const user: UserLocalStorage = JSON.parse(userFromLS);
      if (username !== user.username) {
        navigate(`/articles/${slug}`);
      }
    }
  }

  return currentArticle ? (
    <NewArticle title="Edit article" submitHandler={onSubmit} defaultValues={currentArticle} />
  ) : (
    <Loader />
  );
};