import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import axiosConfig from "../../axiosConfig";
import { useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { showToast } from "../../../../utils/toast";

const DatatableBanningBike = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const response = await axiosConfig.get("/getReportedBikes");
    try {
      if (response.data.code === 200) {
        setIsLoading(false);
        const result = response.data.data;
        console.log(result);
        const dataWithIds = result.map((row, index) => ({
          ...row,
          id: index,
        }));
        setData(dataWithIds);
      }
    } catch (error) {
      showToast("error", error.response.data.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
  const handleClose = () => setOpen(false);
  const handleOpen = (imageUrl) => {
    setModalImage(imageUrl);
    setOpen(true);
  };

  const handleAccept = async (id) => {
    try {
      const response = await axiosConfig.post(`/blockBike/${id}`);
      console.log(response.data);
      if (response.data.code === 200) {
        showToast("success", response.data.message);
        setData((prevData) => prevData.filter((row) => row.id !== id));
      }
    } catch (error) {
      if (error.response) {
        showToast("error", error.response.data.message);
      } else showToast("error", "Có lỗi xảy ra vui lòng thử lại sau");
    }
  };

  const actionColumn = [
    {
      field: "name",
      headerName: "Tên",
      width: 360,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.name}</div>;
      },
    },
    {
      field: "image",
      headerName: "Ảnh",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            className="cellWithImg"
            onClick={() => handleOpen(params.row.image)}
          >
            <img
              className="cellImg"
              src={params.row.image}
              alt="avatar"
              style={{ cursor: "pointer" }}
            />
          </div>
        );
      },
    },
    {
      field: "banammount",
      headerName: "Số lượng report",
      width: 200,
      renderCell: (params) => {
        return <div className="address">{params.row.banRequestAmount}</div>;
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
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">Banning Bike</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={actionColumn}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        loading={isLoading}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={modalImage} alt="AlterImage" style={{ width: "100%" }} />
        </Box>
      </Modal>
    </div>
  );
};

export default DatatableBanningBike;
