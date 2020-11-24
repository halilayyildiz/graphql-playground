import ApolloClient from 'apollo-boost';
import { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import User from './User';

// import logo from './logo.svg';
// import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={client}>
          <User />
        </ApolloProvider>
      </div>
    )
  }
}

export default App;