import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/getAllManagerSR', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWEyMTQyYjM0M2ZkYTMwYjE5OTc2NjYiLCJpYXQiOjE3MDU1OTczNzgsImV4cCI6MTcwNTYwMDk3OH0.wwb5KPre4o0AJ8C2PTIzdF1eafBEzni5djPe4xz3hwY'}` // Bao gồm token trong tiêu đề Authorization
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
      headerName: "User Name",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.userName}
          </div>
        );
      },
    },
    {
      field: "license",
      headerName: "License",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.license} alt="avatar" />
          </div>
        );
      },
    },
    {
      field: "province",
      headerName: "Province",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.province}
          </div>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 160,
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
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Accept</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Decline
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Accept Manager Account
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

export default Datatable;
