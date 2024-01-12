import React from 'react';
import SideNavbar from '../components/SideNavbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';
import BikeInfoContainer from '../components/BikeInfoContainer';

const Homepage = () => {
  const [bikesList, setBikesList] = useState([]);

  async function getBikes() {
    try {
        const response = await axiosConfig.get("/getBikes/659125f35a52a38537c2c998");
        console.log(response.data.data);
        setBikesList(response.data.data);
    } catch (error) {
        console.log("Get bikes failed: ", error);
    }
  }

  useEffect( () => {
    getBikes();
  }, []);



  return (
    <div>
      <Box sx={{display: "flex"}}>
        <SideNavbar />
        <div className='flex flex-col flex-wrap pl-20 pt-20'>
          <h1 className='text-5xl mb-10'>Home</h1>
          <div>
          {
            bikesList.map((bike) => (
              BikeInfoContainer(bike)
            ))
          }
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Homepage;
