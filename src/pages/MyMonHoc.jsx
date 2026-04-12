import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MyMonHoc() {
    // Dữ liệu giả
  const subjects = [
    {
      id: 1,
      code: 'TH001',
      name: 'Công nghệ phần mềm',
      teacher: 'Bùi nhật bằng',
      semester: 'Học kỳ 2 - 2025-2026',
      students: 45
    },
    {
      id: 2,
      code: 'TH002',
      name: 'Phát triển phần mềm mã nguồn mở',
      teacher: 'Nguyễn Xuân Thu',
      semester: 'Học kỳ 2 - 2025-2026',
      students: 50
    },
    {
      id: 3,
      code: 'TH003',
      name: 'Cơ sở dữ liệu nâng cao',
      teacher: 'Duy',
      semester: 'Học kỳ 2 - 2025-2026',
      students: 40
    }
  ];

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

         
         
           
        
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {subjects.map((sub) => (
              <div key={sub.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                
                
                <div className="h-28 bg-gradient-to-r from-red-700 to-red-500 p-5 flex flex-col justify-end relative">
                  <div className="absolute top-4 left bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-md text-white text-xs font-medium border border-white/30">
                    {sub.code}
                  </div>
                  <h3 className="text-white font-bold text-lg truncate" title={sub.name}>{sub.name}</h3>
                  
                </div>

                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span className="font-medium">Giảng viên:</span> {sub.teacher}
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                      <span className="font-medium">Sĩ số:</span> {sub.students} sinh viên
                    </div>
                  </div>

                  
                  <div className="pt-4 border-t border-gray-100">
                    <button className="w-full py-2.5 text-red-700 bg-gray-100 hover:bg-red-100 font-medium rounded-lg transition-colors text-sm">
                      Tham gia môn học
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}