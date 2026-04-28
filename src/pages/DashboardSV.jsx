import React ,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DashboardSV() {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [popupMessage, setPopupMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('https://tttn-be-yhdg.onrender.com/api/student-dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setDashboardData(result.data);
        } else {
          showPopup('Không thể tải dữ liệu bảng điều khiển.');
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error);
        showPopup('Lỗi kết nối máy chủ. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

const showPopup = (message) => {
    setPopupMessage(message);
    setIsPopupOpen(true);
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
 if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
         <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-2 mr-3"></div>
         <p className="text-gray-500 font-medium">Đang tải...</p>
      </div>
    );
  }
  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
   const stats = dashboardData?.statistics || {
    total_groups: 0,
    total_courses: 0,
    upcoming_deadlines: 0,
    reward_points: 0
  };

  let activities = [];
  if (dashboardData?.notifications && dashboardData.notifications.length > 0) {
    activities = dashboardData.notifications;
  } else if (dashboardData?.recent_activities && dashboardData.recent_activities.length > 0) {
    activities = dashboardData.recent_activities;
  }
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full">
        <Header />

      

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
           <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Bảng điều khiển</h1>
              <p className="text-gray-500 text-sm mt-1">Tổng quan về hoạt động nhóm của bạn, {dashboardData?.user?.ho_ten || 'Sinh viên'}</p>
             
            </div>
          </div>
         
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Nhóm đang tham gia</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total_groups}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Môn học hiện tại</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total_courses}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Deadline sắp tới</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.upcoming_deadlines}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Điểm thưởng</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.reward_points}</p>
            </div>
          </div>

          
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động gần đây</h3>
            
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((item, index) => (
                  <div key={item.id_tin_nhan ||item.id || index} className="flex items-start gap-4 p-4 rounded-lg border border-gray-50 hover:bg-gray-50 transition-colors">
                  
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                      </svg>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm font-medium leading-relaxed">
                        {item.noi_dung}
                      </p>
                      <p className="text-gray-400 text-xs mt-1.5 flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatTime(item.thoi_gian_gui || item.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
                
          
                <div className="pt-4 mt-2 border-t border-gray-100 text-center">
                  <button 
                    onClick={() => navigate('/nhomhoc')}
                    className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors"
                  >
                    Xem tất cả nhóm học &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium mb-1">Chưa có hoạt động nào</p>
                <p className="text-gray-400 text-sm mb-6">Hoạt động từ nhóm học tập sẽ xuất hiện ở đây</p>
                
                <button 
                  onClick={() => navigate('/nhomhoc')}
                  className="px-6 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                >
                  Vào trang nhóm học
                </button>
              </div>
            )}
          </div>
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

