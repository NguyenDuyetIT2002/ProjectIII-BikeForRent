import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axiosConfig from "../../axiosConfig";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { showToast } from "../../../../utils/toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Datatable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const fetchData = async () => {
    try {
      const response = await axiosConfig.get("/getAllManagerSR");
      console.log(response.data);
      if (response.data.code === 200) {
        const result = response.data.data;
        console.log(result);
        const dataWithIds = result.map((row, index) => ({
          ...row,
          id: index,
        }));
        setData(dataWithIds);
        // console.log("kết quả là", dataWithIds);
      }
    } catch (error) {
      showToast("error", "Có lỗi khi lấy dữ liệu");
    }
  };
  useEffect(() => {
    fetchData();
  }, [data]);

  const handleDelete = async (id) => {
    try {
      const response = await axiosConfig.post(`/declineSR/${id}`);
      console.log(response.data);
      if (response.data.code === 200) {
        showToast("success", response.data.message);
        setData((prevData) => prevData.filter((row) => row.id !== id));
      }
    } catch (error) {
      showToast("error", "Từ chối thất bại");
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await axiosConfig.post(`/createManager/${id}`);
      console.log(response.data);
      if (response.data.code === 200) {
        showToast("success", response.data.message);
        setData((prevData) => prevData.filter((row) => row.id !== id));
      }
    } catch (error) {
      showToast("error", "Phê duyệt thất bại");
    }
  };

  const handleOpen = (imageUrl) => {
    setModalImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const actionColumn = [
    {
      field: "id",
      headerName: "ID",
      width: 230,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row._id}</div>;
      },
    },
    {
      field: "user",
      headerName: "Tên đăng nhập",
      width: 130,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.userName}</div>;
      },
    },
    {
      field: "license",
      headerName: "Giấy phép kinh doanh",
      width: 160,
      renderCell: (params) => {
        return (
          <div
            className="cellWithImg"
            onClick={() => handleOpen(params.row.license)}
          >
            <img
              className="cellImg"
              src={params.row.license}
              alt="avatar"
              style={{ cursor: "pointer" }}
            />
          </div>
        );
      },
    },
    {
      field: "province",
      headerName: "Quận",
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
      headerName: "Địa chỉ",
      width: 160,
      renderCell: (params) => {
        return <div className="address">{params.row.address}</div>;
      },
    },

    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 160,
      renderCell: (params) => {
        return <div className="phone">{params.row.phone}</div>;
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="acceptButton"
              onClick={() => handleAccept(params.row._id)}
            >
              Phê duyệt
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Từ chối
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Phê duyệt yêu cầu tạo tài khoản chủ cửa hàng
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={actionColumn}
        pageSize={9}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={modalImage} alt="License" style={{ width: "100%" }} />
        </Box>
      </Modal>
    </div>
  );
};

export default Datatable;
