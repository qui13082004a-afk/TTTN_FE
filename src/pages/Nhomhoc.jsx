import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Nhomhoc() {

  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

 
  const handleJoinGroup = (group) => {
    if (group.isFull) {
      setPopupMessage('Nhóm đã đầy thành viên!');
      setIsPopupOpen(true);
    } else if (group.isExpired) {
      setPopupMessage('Đã hết thời gian đăng ký nhóm!');
      setIsPopupOpen(true);
    } else {
      
      alert(`Tham gia ${group.name} thành công!`); 
    }
  };

  // Dữ liệu giả 
  const groups = [
    {
      id: 1,
      name: 'Nhóm 1 - Đồ án cuối kỳ',
      subject: 'Công nghệ phần mềm',
      teacher: 'Bùi nhật bằng',
      members: 5,
      maxMembers: 6,
      role: 'Trưởng nhóm',
      lastActive: '2 giờ trước',
      isJoined: true, 
      isFull: false,
      isExpired: false
    },
    {
      id: 2,
      name: 'Nhóm ôn tập giữa kỳ',
      subject: 'Cơ sở dữ liệu nâng cao',
      teacher: 'Nguyễn Văn An',
      members: 5,
      maxMembers: 5,
      role: '',
      lastActive: '1 ngày trước',
      isJoined: false, 
      isFull: true,    
      isExpired: false
    },
    {
      id: 3,
      name: 'Team Front-end',
      subject: 'Phát triển phần mềm mã nguồn mở',
      teacher: 'Trường',
      members: 2,
      maxMembers: 3,
      role: '',
      lastActive: 'Vừa xong',
      isJoined: false, 
      isFull: false,
      isExpired: true 
    },
    {
      id: 4,
      name: 'Nhóm học nhóm 5',
      subject: 'Lập trình Web',
      teacher: 'Lê Văn C',
      members: 2,
      maxMembers: 5,
      role: '',
      lastActive: '10 phút trước',
      isJoined: false,
      isFull: false,  
      isExpired: false
    }
  ];

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
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all text-sm"
              />
            </div>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm shadow-sm">
              Tìm nhóm
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div key={group.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1" title={group.name}>{group.name}</h3>
                    <p className="text-red-600 text-sm font-medium mt-1">Môn học: {group.subject}</p>
                  </div>
                  
                 
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
                      <span className="text-gray-700 font-medium">{group.teacher}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-500 font-medium">Thành viên</span>
                      <span className={`font-medium ${group.isFull ? 'text-red-600' : 'text-gray-700'}`}>
                        {group.members} / {group.maxMembers}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
                    Hoạt động: {group.lastActive}
                  </div>
                </div>

                {/* Xử lý ẩn/hiện Component Nút bấm */}
                <div className="pt-4 border-t border-gray-100">
                  {group.isJoined ? (
                    <button className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium rounded-lg transition-colors text-sm border border-gray-200">
                      Vào không gian làm việc
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleJoinGroup(group)}
                      className={`w-full py-2.5 font-medium rounded-lg transition-colors text-sm shadow-sm text-white 
                        ${(group.isFull || group.isExpired) 
                          ? 'bg-gray-400 hover:bg-gray-500' 
                          : 'bg-red-600 hover:bg-red-700'
                        }`}
                    >
                      Tham gia nhóm
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>

     
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 transform transition-all">
            
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h3 className="text-lg font-bold text-center text-gray-900 mb-2">Thông báo</h3>
            <p className="text-center text-gray-500 mb-6">{popupMessage}</p>
            
            <button
              onClick={() => setIsPopupOpen(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

    </div>
  );
}