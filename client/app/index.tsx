import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import RegisterScreen from '../screen/RegisterScreen';

const client = new ApolloClient({
  uri: 'http://192.168.1.17:8080/graphql', // GraphQL API'nizin URL'sini buraya ekleyin
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