import './App.css';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import Container from 'react-bootstrap/Container';
import { Home, Login } from './pages';
import Navigation from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <main>
      <ApolloProvider client={client}>
        <Router>
          <Navigation />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </Router>
      </ApolloProvider>
    </main>
  );
}

export default App;
