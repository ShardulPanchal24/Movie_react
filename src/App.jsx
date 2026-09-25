import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Watched from './pages/Watched'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'

function App() {
  return (
    <MovieProvider>    
      <Navbar />
    <main className="main-content">
      <nav>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/favorites">Favorites</Link>
        {' | '}
        <Link to="/watched">Watched Movies</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watched" element={<Watched />} />
      </Routes>
    </main>
    </MovieProvider>
  );
}


export default App
