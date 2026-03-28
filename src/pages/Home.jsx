import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
    
      <header className="flex justify-between items-center py-4 px-8 border-b border-gray-100">
        <div className="text-red-600 font-bold text-xl tracking-tight">STU TEAMWORK</div>
        <Link to="/login" className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md font-medium transition-colors">
          Đăng nhập
        </Link>
      </header>

      
      <main className="flex-grow p-8 lg:p-16 flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-900 leading-tight mb-6">
            Chào mừng sinh viên STU
          </h1>

         
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-gray-500 text-lg md:text-xl max-w-md">
              Nơi quản lý và làm việc nhóm cho sinh viên STU
            </p>

          
            <div className="flex flex-wrap gap-4">
              <button className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2">
                <span className="text-xl">+</span> <Link to="/login">Tham Gia</Link>  
              </button>
              <button className="px-6 py-2.5 bg-red-700 text-white font-medium rounded-md hover:bg-red-800 transition-colors flex items-center gap-2 shadow-sm">
                <span className="text-xl">+</span><Link to="/login"> Tạo Nhóm </Link> 
              </button>
            </div>
          </div>
        </div>


    <section id="body-content" className="w-full max-w-7xl mx-auto mt-12 mb-16 px-4 md:px-0">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Khám Phá Hoạt Động STU</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>

            </div>
          

          <a href="https://www.stu.edu.vn/" target="_blank" rel="noopener noreferrer" className="block mb-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
              <div className="w-full aspect-[16/9] mb-6 overflow-hidden rounded-xl border-4 border-gray-100">
                <img 
                  src="/img/photo-1752553367401-1752553367482272094574.webp"
                  alt="hinh1" 
                  className="w-full h-full object-cover" 
                />
                
              </div>
              <p className="text-gray-600 text-base leading-relaxed grow">
                 Có nhiệm vụ đăng tải thông tin liên quan đến hoạt động của Trường, đảm bảo các thông tin tối thiểu theo quy định của cơ quan quản lý nhà nước. Trang thông tin điện tử phải có ban biên tập chịu trách nhiệm về nội dung thông tin và quản trị về hệ thống; có quy chế về hoạt động và cung cấp thông tin phù hợp với quy định của pháp luật về công nghệ thông tin trên mạng internet, và quy định pháp luật hiện hành liên quan.
              </p>
            </div>
          </a>
           
           <a href="https://www.stu.edu.vn/" target="_blank" rel="noopener noreferrer" className="block">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
               <div className="w-full aspect-[16/9] mb-6 overflow-hidden rounded-xl border-4 border-gray-100">
                <img 
                  src="/img/maxresdefault.jpg"
                  alt="hinh2" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <p className="text-gray-600 text-base leading-relaxed grow">
                 Có trách nhiệm phục vụ tốt cho giảng viên, cán bộ công nhân viên, sinh viên học sinh, tạo điều kiện thuận lợi cho mọi người hoàn thành tốt công tác và việc học tập của mình.
              </p>
            </div>
          </a>
          </div>
      
        </section>
      </main>

    
      <footer className="p-8 text-xs text-gray-400 font-semibold tracking-wider">
        STU TEAMWORK
      </footer>
    </div>
  );
}