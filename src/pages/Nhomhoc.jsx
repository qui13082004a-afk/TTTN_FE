import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Nhomhoc() {
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState('error');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const showPopup = (message, type = 'error') => {
    setPopupMessage(message);
    setPopupType(type);
    setIsPopupOpen(true);
  };

const fetchGroups = async (keyword = '') => {
    setIsLoading(true);
    try {
      
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (!token || !userStr) {
        navigate('/login');
        return;
      }
      const currentUser = JSON.parse(userStr);
      const id_sinh_vien = currentUser.id; 
      
      
      let url = `https://tttn-be-yhdg.onrender.com/api/group-show?id_sinh_vien=${id_sinh_vien}`;
      if (keyword.trim() !== '') {
        url += `&keyword=${encodeURIComponent(keyword.trim())}`;
      }
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setGroups(result.data);
      } else {
        setGroups([]); 
      }
    } catch (error) {
      console.error('Lỗi khi fetch data:', error);
      setPopupMessage('Có lỗi xảy ra khi kết nối tới máy chủ.');
      setIsPopupOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
 useEffect(() => {
  
    fetchGroups();
  }, []);
   const handleJoinGroup = async (group) => {
    
    if (group.so_thanh_vien >= group.so_luong_toi_da) {
      showPopup('Nhóm đã đầy thành viên, không thể tham gia!', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        navigate('/login');
        return;
      }
      
      const currentUser = JSON.parse(userStr);

     
      const response = await fetch('https://tttn-be-yhdg.onrender.com/api/group-join', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_nhom: group.id_nhom,
          id_sinh_vien: currentUser.id
        })
      });

      const result = await response.json();

      
      if (result.success) {
        showPopup(result.message || `Tham gia ${group.ten_nhom} thành công!`, 'success');
        fetchGroups(searchTerm); 
      } else {
        
        showPopup(result.message || 'Không thể tham gia nhóm! Nhóm đã đầy hoặc hết thời gian đăng ký.', 'error');
      }
    } catch (error) {
      console.error('Lỗi khi join group:', error);
      showPopup('Lỗi kết nối máy chủ. Vui lòng thử lại sau.', 'error');
    }
  };
const handleSearch = () => {
    fetchGroups(searchTerm);
  };

 const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
   const handleClearSearch = () => {
    setSearchTerm('');
    fetchGroups(''); 
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Danh sách nhóm học</h1>
              <p className="text-gray-500 text-sm mt-1">Quản lý và tham gia các nhóm làm việc cho các môn học của bạn</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Tìm kiếm nhóm, môn học..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all text-sm"
              />
              {searchTerm && (
                <button 
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-600 transition-colors"
                  title="Xóa tìm kiếm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              )}
            </div>
            <button onClick={handleSearch} className="bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm shadow-sm">
              Tìm nhóm
            </button>
          </div>
          {isLoading ? (
            <div className="text-center py-10">
               <p className="text-gray-500">Đang tải danh sách nhóm...</p>
            </div>
          ) : groups.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-gray-100">
               <p className="text-gray-500">Không tìm thấy nhóm học nào phù hợp.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => {
                 const isFull = group.so_thanh_vien >= group.so_luong_toi_da;


            return (
              <div key={group.id_nhom} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1" title={group.ten_nhom}>{group.ten_nhom}</h3>
                    <p className="text-red-600 text-sm font-medium mt-1">Môn học: {group.ten_mon_hoc}</p>
                  </div>
                  
                  {/* Nếu API sau này có trả về isJoined & role thì hiển thị */}
                  {group.isJoined && (
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      group.role === 'Trưởng nhóm' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {group.role}
                    </span>
                  )}
                </div>

                <div className="flex-1 space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-500 font-medium">Giảng viên</span>
                      <span className="text-gray-700 font-medium">{group.ten_giang_vien}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-500 font-medium">Thành viên</span>
                      <span className={`font-medium ${isFull ? 'text-red-600' : 'text-gray-700'}`}>
                        {group.so_thanh_vien} / {group.so_luong_toi_da}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
                    Trạng thái: <span className="text-green-600 font-medium">{group.trang_thai}</span> 
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  {group.isJoined ? (
                    <button className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium rounded-lg transition-colors text-sm border border-gray-200">
                      Vào không gian làm việc
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleJoinGroup(group)}
                      disabled={isFull}
                      className={`w-full py-2.5 font-medium rounded-lg transition-colors text-sm shadow-sm text-white 
                        ${isFull 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-red-600 hover:bg-red-700'
                        }`}
                    >
                      {isFull ? 'Nhóm đã đầy' : 'Tham gia nhóm'}
                    </button>
                  )}
                </div>
              </div>
            )})}
          </div>
          )}
        </main>
      </div>

     
       {isPopupOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 transform transition-all">
            
            <div className={`flex items-center justify-center w-12 h-12 mx-auto rounded-full mb-4 ${popupType === 'error' ? 'bg-red-100' : 'bg-green-100'}`}>
              {popupType === 'error' ? (
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
               
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
              {popupType === 'error' ? 'Thông báo lỗi' : 'Thành công'}
            </h3>
            <p className="text-center text-gray-500 mb-6">{popupMessage}</p>
            
            <button
              onClick={() => setIsPopupOpen(false)}
              className={`w-full text-white font-medium py-2.5 rounded-lg transition-colors ${popupType === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

    </div>
  );
}