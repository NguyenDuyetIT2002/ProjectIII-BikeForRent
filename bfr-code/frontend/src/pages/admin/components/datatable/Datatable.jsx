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
  p: 6,
};
const Datatable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
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
        setIsLoading(false);
        // console.log("kết quả là", dataWithIds);
      }
    } catch (error) {
      showToast("error", "Có lỗi khi lấy dữ liệu");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosConfig.post(`/declineSR/${id}`);
      console.log(response.data);
      if (response.data.code === 200) {
        showToast("success", response.data.message);
        setData((prevData) => prevData.filter((row) => row._id !== id));
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
        setData((prevData) => prevData.filter((row) => row._id !== id));
      }
    } catch (error) {
      showToast("error", "Phê duyệt thất bại");
    }
  };

  const handleOpen = (rowData) => {
    setModalData(rowData);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const actionColumn = [
    {
      field: "storename",
      headerName: "Tên cửa hàng",
      width: 250,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.name}</div>;
      },
    },
    {
      field: "license",
      headerName: "Giấy phép kinh doanh",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellWithImg" onClick={() => handleOpen(params.row)}>
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
      width: 300,
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
      width: 170,
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
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        loading={isLoading}
        checkboxSelection
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalData && (
            <>
              <h1 className="font-bold text-xl my-4 items-center">
                Thông tin chi tiết:
              </h1>
              <p>Tên cửa hàng: {modalData.name}</p>
              <p>Quận: {modalData.province}</p>
              <p>Địa chỉ: {modalData.address}</p>
              <p>
                Giấy phép kinh doanh:{" "}
                <img
                  src={modalData.license}
                  alt="License"
                  style={{ width: "100%" }}
                />
              </p>
              <p>Số điện thoại: {modalData.phone}</p>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Datatable;
