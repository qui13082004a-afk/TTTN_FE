import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
export default function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); 
        setErrorMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('https://tttn-be-yhdg.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                
                localStorage.setItem('token', data.token);
                
                localStorage.setItem('user', JSON.stringify(data.user));
                
                
                navigate('/dashboard'); 
            } else {
                setErrorMessage(data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Lỗi kết nối đến máy chủ. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };
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

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Email</label>
                <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="DH52200320@student.stu.edu.vn"
                        />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Password</label>
                <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Nhập mật khẩu"
                        />
              </div>

              <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3 rounded-md transition-colors flex justify-center items-center gap-2 mt-4 ${
                            isLoading 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
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