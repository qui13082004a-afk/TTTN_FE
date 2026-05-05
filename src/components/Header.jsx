import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('https://tttn-be-yhdg.onrender.com/api/student-profile/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();
        if (response.ok && result.success) {
          setUserProfile(result.data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin cá nhân:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
   const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts[parts.length - 1].charAt(0).toUpperCase();
  };
  const getAvatarUrl = (avatarData) => {
    if (!avatarData) return null;
    if (avatarData.startsWith('http')) return avatarData;
    return `https://tttn-be-yhdg.onrender.com/uploads/${avatarData}`; 
  };

  return (
    <header className="bg-white border-b border-gray-200 h-[73px] flex items-center justify-between px-8 shrink-0">
      
      
      <div className="flex flex-col justify-center">
        <h2 className="text-red-600 font-bold text-xl tracking-tight leading-none">STU TEAMWORK</h2>
        <p className="text-gray-500 text-xs mt-1 font-medium">Hệ thống quản lý nhóm học tập</p>
      </div>
      
      
      <div className="flex items-center gap-3">
        
        
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors" title="Thông báo">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button>

        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors" title="Hỗ trợ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </button>
       

       
        <div className="h-6 w-px bg-gray-300 mx-1"></div>

         <button 
          onClick={() => navigate('/caidattksv')}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors" 
          title="Hồ sơ cá nhân"
        >
          {userProfile ? (
            userProfile.avatar ? (
              <img 
                src={getAvatarUrl(userProfile.avatar)} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
               
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.ho_ten)}&background=FEE2E2&color=DC2626&bold=true`;
                }}
              />
            ) : (
              <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold border border-red-200">
                {getInitials(userProfile.ho_ten)}
              </div>
            )
          ) : (
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          )}
        </button>


        <button 
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Đăng xuất"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </button>

      </div>
    </header>
  );
};

export default Header;