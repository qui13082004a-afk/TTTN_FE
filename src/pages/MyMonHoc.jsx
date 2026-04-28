import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MyMonHoc() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

 useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('https://tttn-be-yhdg.onrender.com/api/student-courses', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setCourses(result.data);
        } else {
          setPopupMessage('Không thể tải danh sách môn học.');
          setIsPopupOpen(true);
        }
      } catch (error) {
        console.error('Lỗi khi fetch courses:', error);
        setPopupMessage('Lỗi kết nối máy chủ. Vui lòng thử lại sau.');
        setIsPopupOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

const formatDateTime = (isoString) => {
    if (!isoString) return 'Chưa xác định';
    const date = new Date(isoString);
    return date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

 if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
         <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-2 mr-3"></div>
         <p className="text-gray-500 font-medium">Đang tải danh sách môn học...</p>
      </div>
    );
  }


  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          
         
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Môn học của tôi</h1>
              <p className="text-gray-500 text-sm mt-1">Danh sach các môn học đang theo học trong học kỳ này</p>
            </div>
            
          </div>

         
         
           
        {courses.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center bg-white rounded-xl border border-gray-100">
               <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
               </svg>
               <p className="text-gray-500 font-medium">Bạn chưa đăng ký môn học nào.</p>
            </div>
             ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((sub) => (
              <div key={sub.id_lop} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                
                
                <div className="h-28 bg-gradient-to-r from-red-700 to-red-500 p-5 flex flex-col justify-end relative">
                  <div className="absolute top-4 left bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-md text-white text-xs font-medium border border-white/30">
                    {sub.ma_mon}
                  </div>
                  <h3 className="text-white font-bold text-lg truncate" title={sub.ten_mon}>{sub.ten_mon}</h3>
                  
                </div>

                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span className="font-medium">Giảng viên:</span> {sub.giang_vien}
                    </div>
                    
                    
                  </div>

                  
                  <div className="pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => navigate('/nhomhoc')}
                        className="w-full py-2.5 text-red-700 bg-gray-100 hover:bg-red-100 font-medium rounded-lg transition-colors text-sm"
                      >
                        Xem nhóm học
                      </button>
                    </div>
                </div>

              </div>
            ))}
          </div>
             )}
        </main>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 transform transition-all">
            <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full mb-4 bg-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-center text-gray-900 mb-2">Có lỗi xảy ra</h3>
            <p className="text-center text-gray-500 mb-6">{popupMessage}</p>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="w-full text-white font-medium py-2.5 rounded-lg transition-colors bg-red-600 hover:bg-red-700"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}