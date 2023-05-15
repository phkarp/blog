import { newUser, User } from '../types/user';

export const postNewUser = (newUser: newUser) => {
  return fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(newUser),
  }).then(res => res.json());
};

export const getUser = (token: string) => {
  return fetch('https://blog.kata.academy/api/users', {
    method: 'GET',
    headers: { Authorization: token },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

export const putUser = (user: { user: User; token: string }) => {
  return fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: user.token },
    body: JSON.stringify(user.user),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};
