import { fetchUpdateUser } from '../store/userThunk';
import { EditProfile } from '../components/edit-profile/edit-profile';
import { useAppDispatch, useAppSelector } from '../hooks/hook';

export const EditProfilePage = () => {
  const dispatch = useAppDispatch();

  type EditedUser = {
    email: string;
    username: string;
    image: string;
    password?: string;
  };

  const onSubmit = async (data: any) => {
    const editedUser: EditedUser = {
      username: data.username,
      email: data.email,
      image: data.image,
    };

    if (data.password) {
      editedUser.password = data.password;
    }

    await dispatch(fetchUpdateUser({ user: editedUser }));
  };

  const userFromStorage = localStorage.getItem('user');

  if (!userFromStorage) return <div></div>;

  const user = JSON.parse(userFromStorage);

  const { editError } = useAppSelector(state => state.user);

  return <EditProfile onSubmit={onSubmit} user={user} editError={editError} />;
};
