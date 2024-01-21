import React from 'react';
import SideNavbar from '../components/SideNavbar';
import Box from '@mui/material/Box';
import AddBikeForm from '../components/AddBikeForm';
import { useEffect } from 'react';
import { getManagerToken } from '../../../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const Addbike = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (getManagerToken() == null){
      navigate('/auth/login?form="manager"');
    }
  })

  return (
    <div>
      <Box sx={{display: "flex"}}>
        <SideNavbar />
        <div className='flex flex-col flex-wrap pl-20 pt-20'>
          <h1 className='text-5xl mb-10'>Thêm xe</h1>
          <div>
          {
            AddBikeForm()
          }
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Addbike;
