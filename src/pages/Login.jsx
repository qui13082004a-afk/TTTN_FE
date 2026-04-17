import { Link } from 'react-router-dom';
export default function Login() {
    
    return (
    
       
<div className="min-h-screen bg-slate-50 flex flex-col relative">
      
      
      <div className="flex-grow flex items-center justify-center p-4">
        
        <div className="w-full max-w-md">
          
          <div className="text-center mb-8">
            <h1 className="text-red-600 font-bold text-2xl tracking-tight mb-2">STU TEAMWORK</h1>
            <p className="text-gray-500 text-sm">Hệ thống quản lý nhóm học tập</p>
          </div>

         
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            
            <div className="border-t-4 border-teal-800 -mt-8 pt-8 mb-6">
               <h2 className="text-xl font-bold text-gray-900">Xin Chào</h2>
               <p className="text-gray-500 text-sm mt-1">Vui lòng nhập thông tin sinh viên</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="MSSV@student.stu.edu.vn" 
                  className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3 rounded-md transition-colors flex justify-center items-center gap-2 mt-4"
              >
                Đăng nhập <span>→</span>
              </button>
            </form>

            <div className="mt-6">
              <Link to="/" className="text-gray-500 text-sm hover:text-gray-800 transition-colors">
                Quay về ←
              </Link>
            </div>

          </div>
        </div>
      </div>

      
      <footer className="absolute bottom-0 left-0 p-8 text-xs text-blue-900 font-bold tracking-wider">
        STU TEAMWORK
      </footer>
    </div>


    );}