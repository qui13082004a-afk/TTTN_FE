import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function KGLamViec() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const groupId = id || '3';



  const [workspaceData, setWorkspaceData] = useState(null);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState({ can_lam: [], dang_lam: [], hoan_thanh: [] });
  const [newTask, setNewTask] = useState({
    ten_cong_viec: '',
    mo_ta: '',
    han_chot: '',
    id_sinh_vien_phu_trach: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('task_list'); 
  const [editingTask, setEditingTask] = useState(null);


  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('error');

  const showPopup = (message, type = 'error') => {
    setPopupMessage(message);
    setPopupType(type);
    setIsPopupOpen(true);
  };
  const fetchTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://tttn-be-yhdg.onrender.com/api/workspace/${groupId}/tasks`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setTasks(data.data);
    } catch (error) {
      console.error('Lỗi khi fetch lại tasks:', error);
    }
  }, [groupId]);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
       const [wsRes, membersRes, tasksRes] = await Promise.all([
          fetch(`https://tttn-be-yhdg.onrender.com/api/workspace/${groupId}`, { method: 'GET', headers }),
          fetch(`https://tttn-be-yhdg.onrender.com/api/workspace/${groupId}/members`, { method: 'GET', headers }),
          fetch(`https://tttn-be-yhdg.onrender.com/api/workspace/${groupId}/tasks`, { method: 'GET', headers })
        ]);
        const wsData = await wsRes.json();
        const membersData = await membersRes.json();
        const tasksData = await tasksRes.json();

        if (wsRes.ok && wsData.success) {
          setWorkspaceData(wsData.data);
          
          
          const allowedTabs = wsData.data.menu_actions.filter(action => action.allow);
          if (allowedTabs.length > 0 && !allowedTabs.find(t => t.key === activeTab)) {
            setActiveTab(allowedTabs[0].key);
          }
        } else {
          setPopupMessage('Không thể tải dữ liệu');
          setIsPopupOpen(true);
        }

        
        if (membersRes.ok && membersData.success) {
          setMembers(membersData.data);
        }

      
        if (tasksRes.ok && tasksData.success) {
          setTasks(tasksData.data);
        }

      } catch (error) {
        console.error('Lỗi dữ liệu:', error);
        setPopupMessage('Lỗi kết nối máy chủ.');
        setIsPopupOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspace();
    
  }, [groupId, navigate]);

  const handleUpdateTaskStatus = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://tttn-be-yhdg.onrender.com/api/workspace/tasks/${editingTask.id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trang_thai: editingTask.status
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showPopup('Cập nhật trạng thái thành công!', 'success');
        setEditingTask(null); 
        fetchTasks();         
      } else {
        showPopup(result.message || 'Có lỗi xảy ra khi cập nhật.', 'error');
      }
    } catch (error) {
      console.error('Lỗi cập nhật task:', error);
      showPopup('Lỗi kết nối máy chủ.', 'error');
    }
  };

   const handleCreateTask = async (e) => {
    e.preventDefault();

   
    if (!newTask.ten_cong_viec || !newTask.han_chot || !newTask.id_sinh_vien_phu_trach) {
      showPopup('Vui lòng nhập Tên công việc, Người phụ trách và Hạn chót.', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://tttn-be-yhdg.onrender.com/api/workspace/${groupId}/tasks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ten_cong_viec: newTask.ten_cong_viec,
          mo_ta: newTask.mo_ta,
          han_chot: newTask.han_chot,
          id_sinh_vien_phu_trach: Number(newTask.id_sinh_vien_phu_trach)
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showPopup('Tạo task thành công!', 'success');
        
        setNewTask({ ten_cong_viec: '', mo_ta: '', han_chot: '', id_sinh_vien_phu_trach: '' });
       
        fetchTasks();
        setActiveTab('task_list');
      } else {
        showPopup(result.message || 'Không thể tạo task.', 'error');
      }
    } catch (error) {
      console.error('Lỗi khi tạo task:', error);
      showPopup('Lỗi kết nối máy chủ.', 'error');
    }
  };
   const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
   
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts[parts.length - 1].charAt(0).toUpperCase();
  };





if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
         <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-2 mr-3"></div>
         <p className="text-gray-500 font-medium">Đang tải...</p>
      </div>
    );
  }

 if (!workspaceData) return null;

  const { group_info, current_user, menu_actions } = workspaceData;
  const isLeader = current_user.vai_tro === 'truong_nhom';
  const allowedTabs = menu_actions.filter(action => action.allow);



  const renderTaskCard = (task, status) => (
    <div key={task.id_cong_viec} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-red-300 transition-colors relative group">
      <p className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">{task.ten_cong_viec}</p>
      
      
      {task.nguoi_phu_trach && (
        <div className="flex items-center gap-2 mb-3 mt-2">
          {task.nguoi_phu_trach.avatar ? (
            <img src={task.nguoi_phu_trach.avatar} alt="avatar" className="w-5 h-5 rounded-full object-cover" />
          ) : (
            <div className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-[10px] font-bold">
              {getInitials(task.nguoi_phu_trach.ho_ten)}
            </div>
          )}
          <span className="text-xs text-gray-600">{task.nguoi_phu_trach.ho_ten}</span>
        </div>
      )}

      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-50">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded font-medium flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatDate(task.han_chot)}
        </span>
        
        <button 
          onClick={() => setEditingTask({ 
            id: task.id_cong_viec,
            name: task.ten_cong_viec, 
            status: status, 
            note: task.ghi_chu || '' 
          })}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline px-1"
        >
         Cập nhật trạng thái
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'task_list':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Danh sách công việc</h2>
              
              {isLeader && (
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
                  <h3 className="font-semibold text-gray-700 text-sm">CẦN LÀM ({tasks.can_lam?.length || 0})</h3>
                </div>
                {tasks.can_lam?.map(task => renderTaskCard(task, 'can_lam'))}
              </div>

             
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 min-h-[400px] flex flex-col gap-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-blue-800 text-sm">ĐANG LÀM ({tasks.dang_lam?.length || 0})</h3>
                </div>
                {tasks.dang_lam?.map(task => renderTaskCard(task, 'dang_lam'))}
              </div>

             
              <div className="bg-yellow-50/50 rounded-xl p-4 border border-green-100 min-h-[400px] flex flex-col gap-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-yellow-800 text-sm">HOÀN THÀNH ({tasks.hoan_thanh?.length || 0})</h3>
                </div>
                {tasks.hoan_thanh?.map(task => renderTaskCard(task, 'hoan_thanh'))}
              </div>
            </div>
          </div>
        );

      case 'members':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Thành viên nhóm ({members.length})</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map(member => (
                <div key={member.id_sinh_vien} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                  
                  {member.avatar ? (
                    <img src={member.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                  ) : (
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold border border-red-200">
                      {getInitials(member.ho_ten)}
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">{member.ho_ten}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{member.mssv}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        member.vai_tro === 'Trưởng nhóm' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {member.vai_tro}
                      </span>
                      
                     
                      {member.co_the_xoa && (
                        <button className="text-red-500 hover:text-red-700">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
           
          </div>
        );

      case 'chat':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[500px] flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Không gian thảo luận</h2>
            <div className="flex-1 bg-gray-50 rounded-t-lg p-4 flex flex-col gap-4 overflow-y-auto border-x border-t border-gray-200">
             <p className="text-gray-500 text-sm text-center mt-10">Chưa có tin nhắn nào</p>
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
            <form className="space-y-5 max-w-lg bg-gray-50 p-6 rounded-xl border border-gray-100"  onSubmit={handleCreateTask}>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Tên công việc</label>
               <input 
                  type="text" 
                  value={newTask.ten_cong_viec}
                  onChange={(e) => setNewTask({...newTask, ten_cong_viec: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white" 
                  placeholder="Nhập tên nhiệm vụ ..." 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Người phụ trách</label>
               <select 
                  value={newTask.id_sinh_vien_phu_trach}
                  onChange={(e) => setNewTask({...newTask, id_sinh_vien_phu_trach: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white"
                >
                 <option value="">Chọn thành viên</option>
                  {members.map(mem => (
                    <option key={mem.id_sinh_vien} value={mem.id_sinh_vien}>
                      {mem.ho_ten} - {mem.mssv}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Hạn chót</label>
                <input 
                  type="date" 
                  value={newTask.han_chot}
                  onChange={(e) => setNewTask({...newTask, han_chot: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white" 
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm shadow-sm">
                  Lưu
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setNewTask({ ten_cong_viec: '', mo_ta: '', han_chot: '', id_sinh_vien_phu_trach: '' });
                    setActiveTab('task_list');
                  }}
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
            <h1 className="text-2xl font-bold text-gray-800">{group_info.ten_nhom}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Nhóm số: <span className="font-medium text-gray-700">{group_info.ten_mon_hoc}</span> - 
              Mã lớp: <span className="font-medium text-gray-700">{group_info.ma_lop}</span> - 
              Vai trò: <span className={`font-medium ${isLeader ? 'text-red-600' : 'text-blue-600'}`}>
                {isLeader ? 'Nhóm trưởng' : 'Thành viên'}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-px overflow-x-auto hide-scrollbar">
            {allowedTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors relative
                  ${activeTab === tab.key 
                    ? 'text-red-600 bg-white border-t border-l border-r border-gray-200' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'              
                  }
                `}
              >
                {tab.label}
                {activeTab === tab.key && (
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

            <form className="space-y-4" onSubmit={handleUpdateTaskStatus}>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Tên công việc</label>
                <input 
                  type="text" 
                  defaultValue={editingTask.name}
                  disabled
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-500 bg-gray-50 cursor-not-allowed outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Trạng thái</label>
                
                <select 
                  value={editingTask.status}
                  onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white"
                >
                  <option value="can_lam">Cần làm</option>
                  <option value="dang_lam">Đang làm</option>
                  <option value="hoan_thanh">Hoàn thành</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Ghi chú (Tùy chọn)</label>
                <textarea 
                  defaultValue={editingTask.note}
                  disabled 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 bg-gray-50 cursor-not-allowed outline-none min-h-[100px]"
                  placeholder="Ghi chú..."
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
                  type="submit" 
                  className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm shadow-sm"
                >
                 Lưu
                </button>
              </div>
            </form>
            
          </div>
        </div>
      )}

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
            <h3 className="text-lg font-bold text-center text-gray-900 mb-2">Thông báo</h3>
            <p className="text-center text-gray-500 mb-6">{popupMessage}</p>
            <button onClick={() => setIsPopupOpen(false)} className={`w-full text-white font-medium py-2.5 rounded-lg transition-colors ${popupType === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}