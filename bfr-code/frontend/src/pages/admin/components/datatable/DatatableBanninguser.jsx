import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axiosConfig from "../../axiosConfig";
import dayjs from "dayjs";
import { showToast } from "../../../../utils/toast";

const DatatableBanningUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConfig.get("/getAllBCRequest");
        if (response.status === 200) {
          const formattedData = response.data.data.map((item, index) => {
            const formattedTime = dayjs(item.time).format(
              "HH:mm:ss DD/MM/YYYY"
            );

            return {
              s_id: index + 1,
              time: formattedTime,
              customer_id: item.customer_id,
              _id: item._id,
            };
          });

          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [data]);

  const handleBan = async (id) => {
    try {
      const response = await axiosConfig.post(`/banCustomer/${id}`);
      if (response.status === 200) {
        console.log(response);
        showToast("success", response.data.message);
      }
    } catch (error) {
      showToast("error", error.response.data.message);
    }
  };

  const actionColumn = [
    {
      field: "s_id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "time",
      headerName: "Thời gian",
      width: 500,
    },

    {
      field: "action",
      headerName: "Hành động",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleBan(params.row._id)}
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
      <div className="datatableTitle">Banning Customer</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={actionColumn}
        pageSize={9}
        rowsPerPageOptions={[10]}
        checkboxSelection
        getRowId={(row) => row._id} // Specify the unique identifier property
      />
    </div>
  );
};

export default DatatableBanningUsers;
