import "./list.scss"
import Sidebar from "../components/sidebar/Sidebar"
import DatatableBanningBike from "../components/datatable/DatatableBanningBike"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminToken } from '../../../utils/localStorage';

const BanningBike = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (getAdminToken() == null){
      navigate('/auth/login?form="admin"');
    }
  })
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <DatatableBanningBike/>
      </div>
    </div>
  )
}

export default BanningBike