import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@mui/material';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_BACKEND_URL,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <CssBaseline />

    <App />
  </ApolloProvider>,
)
