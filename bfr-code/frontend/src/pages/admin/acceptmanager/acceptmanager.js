import React, { useState, useEffect } from 'react';

function AcceptManager() {
  const [userAccounts, setUserAccounts] = useState([]); // Danh sách tài khoản người dùng
  const [currentPage, setCurrentPage] = useState(1);
  const [accountsPerPage] = useState(10);

  // Giả sử bạn có danh sách tài khoản người dùng từ API hoặc dữ liệu khởi tạo
  useEffect(() => {
    // Gọi API hoặc khởi tạo danh sách tài khoản người dùng
    // Ví dụ:
    const sampleUserAccounts = [
      { id: 1, username: 'user1', email: 'user1@example.com' },
      { id: 2, username: 'user2', email: 'user2@example.com' },
      // ... (danh sách tài khoản người dùng khác)
    ];
    setUserAccounts(sampleUserAccounts);
  }, []);

  // Tính toán index bắt đầu và kết thúc của trang
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = userAccounts.slice(indexOfFirstAccount, indexOfLastAccount);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Admin Accept User Accounts</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            {/* Thêm các cột khác nếu cần */}
          </tr>
        </thead>
        <tbody>
          {currentAccounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.username}</td>
              <td>{account.email}</td>
              {/* Thêm các cột khác nếu cần */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <ul>
        {Array.from({ length: Math.ceil(userAccounts.length / accountsPerPage) }).map((_, index) => (
          <li key={index}>
            <button onClick={() => paginate(index + 1)}>{index + 1}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AcceptManager;
