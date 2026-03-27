import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
    
      <header className="flex justify-between items-center py-4 px-8 border-b border-gray-100">
        <div className="text-red-600 font-bold text-xl tracking-tight">STU TEAMWORK</div>
        <Link to="/login" className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md font-medium transition-colors">
          Đăng nhập
        </Link>
      </header>

      
      <main className="flex-grow p-8 lg:p-16 flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-900 leading-tight mb-6">
            Chào mừng sinh viên STU
          </h1>

         
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-gray-500 text-lg md:text-xl max-w-md">
              Nơi quản lý và làm việc nhóm cho sinh viên STU
            </p>

          
            <div className="flex flex-wrap gap-4">
              <button className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2">
                <span className="text-xl">+</span> Tham Gia
              </button>
              <button className="px-6 py-2.5 bg-red-700 text-white font-medium rounded-md hover:bg-red-800 transition-colors flex items-center gap-2 shadow-sm">
                <span className="text-xl">+</span> Tạo Nhóm
              </button>
            </div>
          </div>
        </div>
      </main>

    
      <footer className="p-8 text-xs text-gray-400 font-semibold tracking-wider">
        STU TEAMWORK
      </footer>
    </div>
  );
}