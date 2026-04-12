import React from 'react';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <aside className="sidebar">
      
      <nav>
        <ul>
          <li>Bảng điều khiển</li>
          <li>Môn học của tôi</li>
          <li>Nhóm học</li>
          <li>Không gian làm việc</li>
          <li>Lịch làm việc</li>
          <li>Cài đặt tài khoản</li>
          
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;