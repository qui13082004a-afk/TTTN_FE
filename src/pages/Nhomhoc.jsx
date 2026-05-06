import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Nhomhoc() {
  const navigate = useNavigate();
  const location = useLocation();

  const [popupMessage, setPopupMessage] = useState('error');
  const [popupType, setPopupType] = useState('error'); 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [instructorMap, setInstructorMap] = useState({});
  const [courses, setCourses] = useState([]);

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

      const searchParams = new URLSearchParams(location.search);
      const id_lop = searchParams.get('id_lop');
      
      let url = `https://tttn-be-yhdg.onrender.com/api/group-show?`;
      
      if (id_lop) {
        url += `id_lop=${id_lop}`;
      } else {
        url += `id_sinh_vien=${id_sinh_vien}`;
      }

    
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
      showPopup('Có lỗi xảy ra khi kết nối tới máy chủ.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInstructors = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('https://tttn-be-yhdg.onrender.com/api/student-courses', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        const mapper = {};
        result.data.forEach(item => {
         mapper[item.id_lop] = item.giang_vien;
        });
        setInstructorMap(mapper);
        setCourses(result.data);
      }
    } catch (error) {
      console.error('Lỗi khi fetch giảng viên:', error);
    }
  };

  useEffect(() => {
    fetchInstructors();
    fetchGroups();
  }, [location.search]);

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
                 const displayGiangVien = instructorMap[group.id_lop] || group.giang_vien || 'Chưa có giảng viên';
                 const isJoined = group.is_tham_gia === 'Đã tham gia';
                const displayStatus = isJoined 
                  ? 'Đang hoạt động' 
                  : (isFull || group.trang_thai === 'Đã đầy') 
                    ? 'Đã đầy' 
                    : group.trang_thai;
            return (
              <div key={group.id_nhom} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
                
                <div className="flex justify-between items-start mb-4">
                   <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border bg-white ${
                      displayStatus === 'Đã đầy'
                        ? 'text-red-600 border-red-300' 
                        : displayStatus === 'Hết hạn' 
                          ? 'text-amber-600 border-amber-300' 
                          : 'text-green-600 border-green-300'
                    }`}>
                      {displayStatus}
                    </span>
                                    
                    
                    {isJoined && group.role && (
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        group.role === 'Trưởng nhóm' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        {group.role}
                      </span>
                    )}
                </div>

                <div className="flex-1 space-y-3 mb-6">

                  <div className="flex items-start gap-2.5">
                    <div className="text-red-600 mt-0.5 shrink-0">
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2" title={group.ten_nhom}>{group.ten_nhom}</h3>
                  </div>

                 <div className="pl-8 space-y-2">
                   
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                        <span className="font-medium text-gray-800 truncate" title={group.ten_mon_hoc}>{group.ten_mon_hoc}</span>
                      </div>

                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 shrink-0">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <span className="truncate" title={displayGiangVien}>Giảng viên: <span className="font-medium text-gray-800">{displayGiangVien}</span></span>
                    </div>
                  
                    <div className="mt-auto">
                      <div className="flex items-center gap-1.5 text-sm py-3">
                        
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                          </svg>
                          
                          <span className={`font-bold text-gray-700`}> 
                            {group.so_thanh_vien}
                          </span>
                          
                          <span className="text-gray-500 font-medium">Thành viên</span>
                      </div>        
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-gray-100">
                  
                  {isJoined ? (
                    <button 
                     onClick={() => navigate(`/kglamviec/${group.id_nhom}`)}
                      className="w-full py-2.5 font-medium rounded-lg transition-colors text-sm shadow-sm text-white bg-gray-400"
                    >
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