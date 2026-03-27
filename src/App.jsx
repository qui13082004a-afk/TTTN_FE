import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans text-gray-900 bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="/login" element={<Login />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;