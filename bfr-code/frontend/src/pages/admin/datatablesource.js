export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
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
          {params.row.status}
        </div>
      );
    },
  },
  {
    field: "address",
    headerName: "Address",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="address">
          {params.row.email}
        </div>
      );
    },
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="phone">
          {params.row.age}
        </div>
      );
    },
  },
  
];

//temporary data



