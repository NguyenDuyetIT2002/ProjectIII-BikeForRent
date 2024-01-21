import "./list.scss"
import Sidebar from "../components/sidebar/Sidebar"
import DatatableBanningUser from "../components/datatable/DatatableBanninguser"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminToken } from '../../../utils/localStorage';

const BanningUsers = () => {
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
        <DatatableBanningUser/>
      </div>
    </div>
  )
}

export default BanningUsers