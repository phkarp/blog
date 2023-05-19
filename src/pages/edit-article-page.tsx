import { FieldValues } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { NewArticle } from '../components/new-article/new-article';
import { getFullArticle, updateArticle } from '../services/articles';
import { Loader } from '../components/loader/loader';
import { UserLocalStorage } from '../types/user-types';

export const EditArticlePage = () => {
  const [currentArticle, setCurrentArticle] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async (slug: string) => {
      const article = await getFullArticle(slug);

      if (!article) return;

      article.tagList = article.tagList.map((tag: string) => {
        return { name: tag };
      });

      setCurrentArticle(article);
    };

    if (!slug) return;

    fetchUser(slug).catch(err => console.error(err));
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
    if (!userFromLS) return;
    const user: UserLocalStorage = JSON.parse(userFromLS);

    if (!slug) return;
    const response = await updateArticle(slug, user.token, newData).catch(err => console.error(err));

    response.article ? setSuccess(true) : setSuccess(false);
  };

  if (!currentArticle) return <Loader />;
  const { author } = currentArticle;
  const { username } = author;
  const userFromLS = localStorage.getItem('user');

  if (!userFromLS) return <Loader />;

  const user: UserLocalStorage = JSON.parse(userFromLS);

  if (username !== user.username) {
    navigate(`/articles/${slug}`);
  }

  return currentArticle ? (
    <>
      {success ? (
        <div
          style={{
            position: 'fixed',
            left: 50,
            background: 'rgba(134, 176, 118,0.3)',
            padding: 20,
          }}>
          <span>Статья отредактирована успешно</span>
          <button
            style={{ display: 'block', marginTop: 10, background: 'white', borderColor: 'green' }}
            onClick={() => setSuccess(false)}>
            закрыть уведомление
          </button>
        </div>
      ) : (
        ''
      )}
      <NewArticle title="Edit article" submitHandler={onSubmit} defaultValues={currentArticle} />
    </>
  ) : (
    <Loader />
  );
};
