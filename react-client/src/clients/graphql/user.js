import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Users {
    users {
      id
      email
      username
      role
    }
  }
`;

export const GET_USER = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      email
      username
      role
      messages {
        id
        text
        createdAt
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      email
      username
      role
      messages {
        id
        text
        createdAt
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password) {
      token
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($username: String!) {
    updateUser(username: $username) {
      id
      email
      username
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;
