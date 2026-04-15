import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  
  const getNavLinkClass = ({ isActive }) => {
    return `block px-8 py-3 font-medium transition-colors ${
      isActive 
        ? 'text-red-600 bg-gray-200 rounded-lg hover:bg-red-100 hover:text-red-700' 
        : '' 
    }`;
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col flex-shrink-0">
      
      <div className="py-4 px-8 border-b border-gray-100 flex items-center h-[73px]">
        <div className="font-bold text-gray-800">MENU CHÍNH</div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <li>
            <NavLink to="/dashboard" className={getNavLinkClass}>
              Bảng điều khiển
            </NavLink>
          </li>
          <li>
            <NavLink to="/monhoc" className={getNavLinkClass}>
              Môn học của tôi
            </NavLink>
          </li>
          <li>
           
            <NavLink to="/nhomhoc" className={getNavLinkClass}>
              Nhóm học
            </NavLink>
          </li>
          <li>
            <NavLink to="/kglamviec" className={getNavLinkClass}>
              Không gian làm việc
            </NavLink>
          </li>
          <li>
            <NavLink to="#lich" className={getNavLinkClass}>
              Lịch làm việc
            </NavLink>
          </li>
          <li>
            <NavLink to="/caidattksv" className={getNavLinkClass}>
              Cài đặt tài khoản
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;