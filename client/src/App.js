import './App.css';
import Container from 'react-bootstrap/Container';
import { Home, Login } from './pages';
import Navigation from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <main>
      <Router>
        <Navigation />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Router>
    </main>
  );
}

export default App;
