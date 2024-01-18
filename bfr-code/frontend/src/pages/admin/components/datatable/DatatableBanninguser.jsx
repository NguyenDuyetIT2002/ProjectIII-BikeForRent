import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const DatatableBanningUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/customer/getAllCustomers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTkxMmY5OGQ0ODk5NzgxYjQ4ODMyMjgiLCJpYXQiOjE3MDU1OTgxMDAsImV4cCI6MTcwNTYwMTcwMH0.Rs9GrQTzPovRJcwJRgsjdso0LxD8rwUBT3Y4OTjnuN8'}` // Bao gồm token trong tiêu đề Authorization
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();

      // Thêm thuộc tính `id` vào mỗi dòng
      const dataWithIds = result.data.map((row, index) => ({ ...row, id: index }));

      setData(dataWithIds);
      console.log('kết quả là', dataWithIds);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  fetchData();
}, []); // Chạy một lần khi component được render
 // Chạy một lần khi component được render

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
      {
      field: "id",
      headerName: "ID",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row._id}
          </div>
        );
      },
    },
    {
      field: "user",
      headerName: "Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 260,
      renderCell: (params) => {
        return (
          <div className="address">
            {params.row.address}
          </div>
        );
      },
    },

    {
      field: "phone",
      headerName: "Phone",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="phone">
            {params.row.phone}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="phone">
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Ban
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Banning Customer
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableBanningUsers;
