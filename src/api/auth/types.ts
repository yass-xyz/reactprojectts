export type LoginCredentialsDTO = {
  email: string;
  //password?: string;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};
export type AuthUser = {
  userName: string;
  id: string;
  mail: string;
  name: string;
  firstName: string;
};

export type RegisterCredentialsDTO = {
  mail: string;
  userName: string;
  password: string;
  firstName: string;
  name: string;
};
