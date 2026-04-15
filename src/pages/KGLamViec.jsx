import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function KGLamViec() {
  const [activeTab, setActiveTab] = useState('todo');
  const [editingTask, setEditingTask] = useState(null);

  const Group = [
    {
      id: 5,
      classid: 'TH001',
      groupname: 'Đồ án cuối kỳ',
      isLeader: true, 
    },
  ];

  const tabs = [
    { id: 'todo', label: 'Việc cần làm' },
    { id: 'members', label: 'Xem thành viên nhóm' },
    { id: 'tl', label: 'Thảo luận nhóm' },
    { id: 'donxin', label: 'Xin đổi nhóm' },
  ];

  if (Group[0]?.isLeader) {
    tabs.push({ id: 'create_task', label: 'Tạo task mới' });
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'todo':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Danh sách công việc</h2>
              
              {Group[0]?.isLeader && (
                <button 
                  onClick={() => setActiveTab('create_task')}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors font-medium flex items-center gap-2 text-sm shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Tạo task mới
                </button>
              )}
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 min-h-[400px] flex flex-col gap-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700 text-sm">CẦN LÀM</h3>
                
                </div>
                
               <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-red-300 transition-colors relative group">
                <p className="font-medium text-gray-800 text-sm mb-1">Thiết kế Database</p>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">ădawdawd</p>

                <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded font-medium">20/04/2026</span>
                    
                   
                    <button 
                    onClick={() => setEditingTask({ name: 'Thiết kế Database', status: 'todo', note: 'Tạo các đối tượng...' })}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline px-1"
                    >
                    Cập nhật trạng thái
                    </button>
                </div>
                </div>
              </div>

              
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 min-h-[400px] flex flex-col gap-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-blue-800 text-sm">ĐANG LÀM</h3>
                  
                </div>

               
                
              </div>

              
              <div className="bg-yellow-50/50 rounded-xl p-4 border border-green-100 min-h-[400px] flex flex-col gap-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-yellow-800 text-sm">HOÀN THÀNH</h3>
                  
                </div>

                
               
              </div>

            </div>
          </div>
        );

      case 'members':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Thành viên nhóm</h2>
           
           
          </div>
        );

      case 'tl':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[500px] flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Không gian thảo luận</h2>
            <div className="flex-1 bg-gray-50 rounded-t-lg p-4 flex flex-col gap-4 overflow-y-auto border-x border-t border-gray-200">
             
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-b-lg flex gap-2">
              <input 
                type="text" 
                placeholder="Nhập tin nhắn..." 
                className="flex-1 bg-gray-50 border-none focus:ring-0 outline-none px-3 py-2 rounded text-sm"
              />
              <button className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </div>
        );

      case 'donxin':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Đơn xin chuyển nhóm</h2>
            <form className="space-y-5 max-w-lg bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Chọn nhóm muốn chuyển</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white">
                  <option value="">-- Chọn nhóm --</option>
                  <option value="1">Nhóm 1</option>
                  <option value="2">Nhóm 2</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Lý do chuyển nhóm</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white min-h-[120px]"
                  placeholder="Nhập lý do chuyển nhóm"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm shadow-sm">
                  Lưu
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('todo')}
                  className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm shadow-sm"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        );

      case 'create_task':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Thêm task mới</h2>
            <form className="space-y-5 max-w-lg bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Tên công việc</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white" 
                  placeholder="Nhập tên nhiệm vụ ..." 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Người phụ trách</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white">
                  <option value="">Chọn thành viên</option>
                  <option value="sv1">Sinh viên 1</option>
                  <option value="sv2">Sinh viên 2</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Hạn chót</label>
                <input 
                  type="date" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white" 
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm shadow-sm">
                  Lưu
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('todo')}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm shadow-sm"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 flex flex-col">
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{Group[0]?.groupname}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Nhóm số: <span className="font-medium text-gray-700">{Group[0]?.id}</span> - 
              Mã lớp: <span className="font-medium text-gray-700">{Group[0]?.classid}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-px overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors relative
                  ${activeTab === tab.id 
                    ? 'text-red-600 bg-white border-t border-l border-r border-gray-200' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'              
                  }
                `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-white"></span>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1">
            {renderTabContent()}
          </div>

        </main>
      </div>
    

{editingTask && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 transform transition-all">
      
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-bold text-gray-900">Cập nhật task</h3>
        <button onClick={() => setEditingTask(null)} className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form className="space-y-4">
        
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Tên công việc</label>
          <input 
            type="text" 
            defaultValue={editingTask.name}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white" 
          />
        </div>

        
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Trạng thái</label>
          <select 
            defaultValue={editingTask.status}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white"
          >
            <option value="todo">Cần làm</option>
            <option value="doing">Đang làm</option>
            <option value="done">Hoàn thành</option>
          </select>
        </div>

        
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Ghi chú</label>
          <textarea 
            defaultValue={editingTask.note}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white min-h-[100px]"
            placeholder="Nhập ghi chú tiến độ công việc..."
          ></textarea>
        </div>

       
        <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
          
          <button 
            type="button" 
            onClick={() => setEditingTask(null)}
            className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm shadow-sm"
          >
            Hủy
          </button>
          <button 
            type="button" 
            onClick={() => {
             
              setEditingTask(null);
            }}
            className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm shadow-sm"
          >
            Cập nhật
          </button>
        </div>
      </form>
      
    </div>
  </div>
)}
    </div>
  );
}