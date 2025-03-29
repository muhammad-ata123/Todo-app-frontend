import { gql } from '@apollo/client';
import { TODO_FIELDS } from './fragments';

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      ...TodoFields
    }
  }
  ${TODO_FIELDS}
`;

export const GET_TODO = gql`
  query GetTodo($id: String!) {
    todo(id: $id) {
      ...TodoFields
    }
  }
  ${TODO_FIELDS}
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $description: String) {
    createTodo(title: $title, description: $description) {
      ...TodoFields
    }
  }
  ${TODO_FIELDS}
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      ...TodoFields
    }
  }
  ${TODO_FIELDS}
`;

export const TOGGLE_TODO_STATUS = gql`
  mutation ToggleTodoStatus($id: ID!) {
    toggleTodoStatus(id: $id) {
      ...TodoFields
    }
  }
  ${TODO_FIELDS}
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
