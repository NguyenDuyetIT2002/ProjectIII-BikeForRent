import React from "react";
import SideNavbar from "../components/SideNavbar";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import BikeInfoContainer from "../components/BikeInfoContainer";
import { useSelector } from "react-redux";
import { getManagerToken } from "../../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toast";

const Homepage = () => {
  const [bikesList, setBikesList] = useState([]);
  const manager_id = useSelector((state) => {
    //console.log(state.manager.managerInfo._id);
    if (state.manager.managerInfo) return state.manager.managerInfo._id;
    return "none";
  });
  const navigate = useNavigate();

  async function getBikes() {
    try {
      const response = await axiosConfig.get(`/getBikes/${manager_id}`);
      console.log(response.data.data);
      setBikesList(response.data.data);
    } catch (error) {
      console.log("Get bikes failed: ", error);
    }
  }

  const deleteBike = async (bikeID) => {
    try {
      const response = await axiosConfig.delete(`/deleteBike/${bikeID}`);
      setBikesList(bikesList.filter((item) => item._id !== bikeID));
      showToast("success", "Xóa xe thành công");
    } catch (error) {
      showToast("error", "Xóa xe thất bại");
    }
  };

  useEffect(() => {
    // if (getManagerToken() == null) {
    //   navigate("/auth/login?form=manager");
    // }
    getBikes();
  }, [bikesList]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <div className="flex flex-col flex-wrap pl-20 pt-20">
          <h1 className="text-5xl mb-10">Danh sách xe</h1>
          <div>
            {bikesList.map((bike) => (
              <BikeInfoContainer
                bikeInfo={bike}
                deleteBike={deleteBike}
              ></BikeInfoContainer>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Homepage;
