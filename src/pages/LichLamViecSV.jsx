import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function LichLamViec() {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [markedDates, setMarkedDates] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
   const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };
useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const dateStr = formatDateToYYYYMMDD(selectedDate);
        const response = await fetch(`https://tttn-be-yhdg.onrender.com/api/student-schedule?date=${dateStr}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setMarkedDates(result.data.marked_dates || []);
          setDayEvents(result.data.events || []);
        } else {
          setDayEvents([]);
          console.error(result.message);
        }
      } catch (error) {
        console.error('Lỗi khi fetch lịch làm việc:', error);
        setPopupMessage('Không thể kết nối đến máy chủ.');
        setIsPopupOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [selectedDate, navigate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const days = [];
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
 
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  
  const handleDayClick = (day) => {
    if (day) {
      setSelectedDate(new Date(year, month, day));
    }
  };

 
  const isDayMarked = (day) => {
    if (!day) return false;
    const dateStr = formatDateToYYYYMMDD(new Date(year, month, day));
    return markedDates.includes(dateStr);
  };
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Lịch làm việc</h1>
            <p>Theo dõi các cuộc họp nhóm và thời hạn nộp bài</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-gray-800">Tháng {month + 1}, {year}</h2>
                  <div className="flex gap-1">
                    <button onClick={handlePrevMonth} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button onClick={handleNextMonth} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>

                
                <div className="grid grid-cols-7 gap-1 text-center mb-3">
                  {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (
                    <span key={d} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{d}</span>
                  ))}
                </div>

                
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, idx) => {
                    const isSelected = day && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
                    return (
                      <button
                        key={idx}
                        disabled={!day}
                        onClick={() => handleDayClick(day)}
                        className={`h-10 text-sm font-semibold rounded-xl flex flex-col items-center justify-center relative transition-all
                          ${!day ? 'invisible' : 'hover:bg-red-50 hover:text-red-600'}
                          ${isSelected ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-110 z-10' : 'text-gray-700'}
                        `}
                      >
                        {day}
                        
                       
                        {day && isDayMarked(day) && (
                          <span className={`w-1 h-1 rounded-full absolute bottom-1.5 ${isSelected ? 'bg-white' : 'bg-red-500'}`}></span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[450px] w-full">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-4">
                 
                  <h2 className="text-xl font-bold text-gray-800">Sự kiện trong ngày {selectedDate.getDate().toString().padStart(2, '0')}/{(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/{selectedDate.getFullYear()}</h2>
                </div>
                
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-4"></div>
                  <p className="text-gray-400 text-sm">Đang tải sự kiện...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {dayEvents.length > 0 ? (
                    dayEvents.map(event => (
                      <div key={event.id_cong_viec} className="flex items-center gap-5 p-5 border border-gray-50 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors group">
                         <div className="text-sm font-bold text-gray-400 group-hover:text-red-500 transition-colors w-14 text-right border-r border-gray-200 pr-5">
                          {formatTime(event.thoi_gian)}
                         </div>
                         <div className="flex-1">
                            <h4 className="font-bold text-gray-800 transition-colors">{event.ten_cong_viec}</h4>
                            <p className="text-xs text-gray-500 mt-1 font-medium flex items-center gap-1.5">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                              </svg>
                              {event.nhom}
                            </p>
                         </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-200">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </div>
                      <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Không có sự kiện</p>
                      <p className="text-gray-400 text-sm mt-1">không có deadline nào trong ngày này</p>
                    </div>
                  )}
                </div>
              )}
            </div>

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
            <h3 className="text-lg font-bold text-center text-gray-900 mb-2">Thông báo</h3>
            <p className="text-center text-gray-500 mb-6">{popupMessage}</p>
            <button onClick={() => setIsPopupOpen(false)} className="w-full text-white font-medium py-2.5 rounded-lg transition-colors bg-red-600 hover:bg-red-700">
              Đóng
            </button>
          </div>
        </div>
      )}

    </div>
  );
}