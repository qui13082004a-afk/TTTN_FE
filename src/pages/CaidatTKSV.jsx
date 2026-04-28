import React , { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function CaidatTKSV() {

  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  useEffect(() => {
   const fetchProfileData = async () => {
      try {
       
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (!token || !userStr) {
         
          navigate('/login');
          return;
        }

        const currentUser = JSON.parse(userStr);

        
        const response = await fetch(`https://tttn-be-yhdg.onrender.com/api/student-profile/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (response.ok && result.success) {
        
          setProfile(result.data);
          
          
          setEmail(result.data.email || '');
          setPhone(result.data.sdt || '');
        } else {
          setErrorMessage('Không thể tải dữ liệu hồ sơ.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrorMessage('Lỗi kết nối máy chủ.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  
  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <p className="text-gray-500 font-medium">Đang tải thông tin...</p>
      </div>
    );
  }

  
  const getInitials = (name) => {
    if (!name) return 'S';
    const names = name.split(' ');
    return names[names.length - 1].charAt(0).toUpperCase();
  };

 
  const extractStudentId = (emailStr) => {
    if (!emailStr) return '';
    return emailStr.split('@')[0].toUpperCase();
  };







  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          
          <div className="mb-8 max-w-4xl">
            <h1 className="text-2xl font-bold text-gray-800">Cài đặt tài khoản</h1>
            <p className="text-gray-500 text-sm mt-1">Quản lý thông tin cá nhân và các tùy chọn hệ thống</p>
          </div>
            {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm max-w-4xl">
                {errorMessage}
            </div>
            )}
         {profile && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-4xl">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Thông tin cá nhân</h2>
            <p className="text-gray-500 mb-8 text-sm">Cập nhật thông tin hồ sơ hiển thị với mọi người</p>
            
            <div className="flex items-center gap-6 mb-8">
             {profile.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt="Avatar" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md">
                    {getInitials(profile.ho_ten)}
                  </div>
                )}
              <div>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm shadow-sm">
                  Thay đổi ảnh đại diện
                </button>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                  <input 
                    type="text" 
                    value={profile.ho_ten || ''}
                    disabled 
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-500 outline-none cursor-not-allowed text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mã số sinh viên</label>
                  <input 
                    type="text" 
                    value={extractStudentId(profile.email)}
                    disabled 
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-500 outline-none cursor-not-allowed text-sm" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    disabled
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-500 outline-none cursor-not-allowed text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                  <input 
                    type="text" 
                    value={phone}
                    disabled
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-500 outline-none cursor-not-allowed text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end mt-4">
                <button type="button" className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm text-sm">
                  Lưu
                </button>
              </div>
            </form>
          </div>
         )}
        </main>
      </div>
    </div>
  );
}