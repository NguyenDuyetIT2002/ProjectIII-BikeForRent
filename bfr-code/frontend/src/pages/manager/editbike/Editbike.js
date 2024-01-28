import React from "react";
import SideNavbar from "../components/SideNavbar";
import Box from "@mui/material/Box";
import EditBikeForm from "../components/EditBikeForm";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getManagerToken } from "../../../utils/localStorage";

const Editbike = () => {
  const location = useLocation();
  const bikeInfo = location.state ? location.state.bikeInfo : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (getManagerToken() == null) {
      navigate('/auth/login?form="manager"');
    }
  });

  return (
    <div style={{ background: "linear-gradient(to right, #f2e2e2, #f0f0f0)" }}>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <div className="flex flex-col flex-wrap pl-20 pt-20">
          <h1 className="text-5xl mb-10">Edit bike</h1>
          <div>
            {
              //EditBikeForm(bikeInfo)
              <EditBikeForm bikeInfo={bikeInfo}></EditBikeForm>
            }
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Editbike;
