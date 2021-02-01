import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query Messages {
    messages {
      edges {
        id
        text
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_MESSAGE = gql`
  query Message($id: ID!) {
    message(id: $id) {
      id
      text
      createdAt
      user {
        email
        username
      }
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($text: String!) {
    createMessage(text: $text) {
      id
      text
      createdAt
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: String!) {
    deleteMessage(id: $id)
  }
`;

// todo: subscription message created
export const MESSAGES_SUBSCRIPTION = gql`
  subscription MessageCreated {
    messageCreated {
      message {
        id
        text
        createdAt
      }
    }
  }
`;
