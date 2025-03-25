import { gql } from '@apollo/client';

export const TODO_FIELDS = gql`
  fragment TodoFields on Todo {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
`;