import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DashboardSV() {
    const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      <Sidebar />

      
      <div className="flex-1 flex flex-col h-full">
        
       
        <Header />

      
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          
         
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Nhóm đang tham gia</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Môn học hiện tại</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Deadline sắp tới</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Điểm thưởng</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
            </div>
          </div>

          
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động gần đây</h3>
            
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <p className="text-gray-500 font-medium mb-1">Chưa có hoạt động nào</p>
              <p className="text-gray-400 text-sm mb-6">Các cập nhật từ nhóm học tập của bạn sẽ xuất hiện ở đây</p>
              
             
              <button className="px-6 py-2.5 bg-red-700 text-white font-medium rounded-md hover:bg-red-800 transition-colors shadow-sm">
                Vào trang nhóm học
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

