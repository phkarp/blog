export interface User {
  email: 'string';
  token: 'string';
  username: 'string';
  bio: 'string';
  image: 'string';
}

export type newUser = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};
