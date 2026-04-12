import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col flex-shrink-0">
     
      <div className="py-4 px-8 border-b border-gray-100 flex items-center h-[73px]">
        <div>MENU CHÍNH</div>
      </div>
      
     
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <li>
            <Link to="/dashboard" className="block px-8 py-3 text-red-700 bg-red-50 font-medium transition-colors">
              Bảng điều khiển
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-8 py-3 text-gray-600 hover:bg-gray-50 hover:text-red-700 font-medium transition-colors">
              Môn học của tôi
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-8 py-3 text-gray-600 hover:bg-gray-50 hover:text-red-700 font-medium transition-colors">
              Nhóm học
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-8 py-3 text-gray-600 hover:bg-gray-50 hover:text-red-700 font-medium transition-colors">
              Không gian làm việc
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-8 py-3 text-gray-600 hover:bg-gray-50 hover:text-red-700 font-medium transition-colors">
              Lịch làm việc
            </Link>
          </li>
          <li>
            <Link to="#" className="block px-8 py-3 text-gray-600 hover:bg-gray-50 hover:text-red-700 font-medium transition-colors">
              Cài đặt tài khoản
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;