import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS, CREATE_TODO } from './graphql/queries';
import { Todo } from './utils/todo.interface';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { loading, error, data } = useQuery(GET_TODOS);

  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTodo({ variables: { title, description } });
    setTitle('');
    setDescription('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ display:'flex', justifyContent:"center", alignItems:"center" , flexDirection:"column" }}>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {data?.todos.map((todo: Todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description || 'No description'}</p>
            <small>Status: {todo.completed ? '✅ Done' : '❌ Pending'}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;