import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axiosConfig from "../../axiosConfig";
import dayjs from "dayjs";
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

const DatatableOpenningUsers = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConfig.get("/getUBRequests");
        if (response.status === 200) {
          const newData = response.data.data.map((item, index) => ({
            _id: item._id,
            id: index + 1,
            image: item.image,
            reason: item.reason,
            time: dayjs(item.time).format("YYYY-MM-DD HH:mm:ss"),
          }));
          setData(newData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  const handleOpenBike = async (id) => {
    try {
      const response = await axiosConfig.post(`/unlockBike/${id}`);
      if (response.status === 200) {
        showToast("success", response.data.message);
      }
    } catch (error) {
      showToast("error", error.response.data.message);
    }
  };

  const handleOpen = (rowData) => {
    setModalData(rowData);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 160,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="img"
          onClick={() => handleOpen(params.row)}
        />
      ),
    },
    { field: "reason", headerName: "Lí do", width: 200 },
    { field: "time", headerName: "Thời gian", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleOpenBike(params.row._id)}
            >
              Mở khóa xe
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">Opening Bike</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          setSelectedRow(newSelection[0]);
        }}
      />
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalData && (
            <>
              <h1 className="font-bold text-xl my-4 items-center">
                Thông tin chi tiết:
              </h1>
              <p className="mb-2">Lí do: {modalData.reason}</p>
              <div className="image-container mb-2">
                <img
                  src={modalData.image}
                  alt="img"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <p>Thời gian: {modalData.time}</p>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default DatatableOpenningUsers;
