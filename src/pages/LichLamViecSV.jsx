import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function LichLamViec() {

  const [selectedDate, setSelectedDate] = useState(15);
  const [currentMonth] = useState({ name: 'Tháng 4', year: 2026 });

  // Dữ liệu giả 
  const events = [
    { id: 1, day: 5, title: 'Nộp sơ đồ ERD', type: 'Bài tập', time: '23:59', subject: 'Cơ sở dữ liệu' },
    { id: 2, day: 15, title: 'Họp nhóm chia task', type: 'Họp nhóm', time: '19:30', subject: 'Đồ án cuối kỳ' },
    { id: 3, day: 15, title: 'Nộp báo cáo tuần 8', type: 'Bài tập', time: '12:00', subject: 'Thực tập tốt nghiệp' },
    { id: 4, day: 20, title: 'Deadline UI/UX', type: 'Deadline', time: '23:59', subject: 'Công nghệ phần mềm' },
    { id: 5, day: 22, title: 'Review code lần 1', type: 'Họp nhóm', time: '20:00', subject: 'Đồ án cuối kỳ' },
  ];

  
  const daysInMonth = 30;
  const startDayOffset = 3; 
  const days = [];
  for (let i = 0; i < startDayOffset; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  
  const selectedDayEvents = events.filter(e => e.day === selectedDate);

  const getEventColor = (type) => {
    if (type === 'Deadline') return 'bg-red-500';
    if (type === 'Họp nhóm') return 'bg-blue-500';
    return 'bg-green-500';
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
                  <h2 className="font-bold text-gray-800">{currentMonth.name}, {currentMonth.year}</h2>
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
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
                  {days.map((day, idx) => (
                    <button
                      key={idx}
                      disabled={!day}
                      onClick={() => day && setSelectedDate(day)}
                      className={`h-10 text-sm font-semibold rounded-xl flex flex-col items-center justify-center relative transition-all
                        ${!day ? 'invisible' : 'hover:bg-red-50 hover:text-red-600'}
                        ${selectedDate === day ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-110 z-10' : 'text-gray-700'}
                      `}
                    >
                      {day}
                      
                      {day && events.some(e => e.day === day) && (
                        <span className={`w-1 h-1 rounded-full absolute bottom-1.5 ${selectedDate === day ? 'bg-white' : 'bg-red-500'}`}></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[450px] w-full">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-4">
                 
                  <h2 className="text-xl font-bold text-gray-800">Sự kiện trong ngày</h2>
                </div>
                
              </div>

              <div className="space-y-4">
                {selectedDayEvents.length > 0 ? (
                  selectedDayEvents.map(event => (
                    <div key={event.id} className="flex items-center gap-5 p-5 border border-gray-50 rounded-2xl bg-gray-50 transition-all group">
                       <div className="text-sm font-bold text-gray-400 w-14 text-right border-r border-gray-200 pr-5">
                        {event.time}
                       </div>
                       <div className="flex-1">
                          <h4 className="font-bold text-gray-800 transition-colors">{event.title}</h4>
                          <p className="text-xs text-gray-500 mt-1 font-medium">{event.subject}</p>
                       </div>
                      
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-200">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Không có sự kiện</p>
                    <p className="text-gray-400 text-sm mt-1">Bạn không có cuộc họp nhóm hay deadline nào trong ngày này</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}