import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import RegisterScreen from '../screen/RegisterScreen';

const client = new ApolloClient({
  uri: 'YOUR_GRAPHQL_API_URL', // GraphQL API'nizin URL'sini buraya ekleyin
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RegisterScreen />
    </ApolloProvider>
  );
};

export default App;