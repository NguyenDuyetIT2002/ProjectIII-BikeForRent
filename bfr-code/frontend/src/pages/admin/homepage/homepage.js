import React from 'react';
import logo from '../../../logo.svg'; 
import './homepage.css'; 

function HomePageAdmin() {
  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
    // Ví dụ: redirect đến trang đăng nhập
    window.location.href = '/logout'; // Đường dẫn đến trang logout của bạn
  };

  const handleUseCaseClick = (useCase) => {
    // Xử lý khi click vào từng use case
    // Đây bạn có thể render nội dung của từng use case tương ứng
    console.log(`Clicked on ${useCase}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <h1 className="text-xl font-bold ml-4">Admin Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-8">
        <div className="flex justify-center">
          {/* Admin Usecase Navigation Buttons */}
          <div className="flex flex-col space-y-4">
            <button onClick={() => handleUseCaseClick('Use Case 1')} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Delete Account</button>
            <button onClick={() => handleUseCaseClick('Use Case 2')} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Accept Store Manager Sign Up Request</button>
            <button onClick={() => handleUseCaseClick('Use Case 3')} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">Accept Banning User Request</button>
            <button onClick={() => handleUseCaseClick('Use Case 4')} className="bg-red-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Accept Banning Bike Request</button>
            {/* ...Thêm các button cho các usecase khác */}
          </div>
          
          {/* Nội dung của từng usecase sẽ được hiển thị ở đây */}
          <div className="ml-8" id="useCaseContent">
            {/* Nội dung usecase sẽ được thay đổi khi click vào từng button */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePageAdmin;
