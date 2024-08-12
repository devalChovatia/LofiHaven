import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Example from './pages/Home.jsx';
import MusicHub from './pages/MusicHub.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path='/musichub' element={<MusicHub />} />
      </Routes>
    </Router>
  );
}

export default App;
