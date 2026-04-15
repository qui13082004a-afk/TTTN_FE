import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import DashboardSV from './pages/DashboardSV.jsx';
import MyMonHoc from './pages/MyMonHoc.jsx';
import Nhomhoc from './pages/Nhomhoc.jsx';
import KGLamViec from './pages/KGLamViec.jsx';
import CaidatTKSV from './pages/CaidatTKSV.jsx';
import LichLamViecSV from './pages/LichLamViecSV.jsx';
function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans text-gray-900 bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardSV />} />
          <Route path="/monhoc" element={<MyMonHoc />} />
          <Route path="/nhomhoc" element={<Nhomhoc />} />
          <Route path="/kglamviec" element={<KGLamViec />} />
          <Route path="/caidattksv" element={<CaidatTKSV />} />
          <Route path="/LichLamViecsv" element={<LichLamViecSV />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;