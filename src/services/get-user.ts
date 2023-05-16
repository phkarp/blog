import { newUser, User, UserUpdate } from '../types/user';

export const postNewUser = (newUser: newUser) => {
  return fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(newUser),
  }).then(res => res.json());
};

export const getUserByToken = (token: string) => {
  return fetch('https://blog.kata.academy/api/user', {
    method: 'GET',
    headers: { Authorization: `Token ${token}` },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

export const putUser = (user: UserUpdate) => {
  const userFromStorage = localStorage.getItem('user');
  if (userFromStorage) {
    const userFromStorageObj: User = JSON.parse(userFromStorage);

    const { token } = userFromStorageObj;

    console.log(userFromStorage);

    return fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${token}` },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .catch(err => console.error(err));
  }
};

export const getToken = (user: {
  user: {
    email: string;
    password: string;
  };
}): Promise<{ user: User }> => {
  return fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};
