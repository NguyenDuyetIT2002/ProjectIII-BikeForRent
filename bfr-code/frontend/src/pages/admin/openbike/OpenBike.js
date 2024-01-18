import "./list.scss"
import Sidebar from "../components/sidebar/Sidebar"
import DatatableOpenningBike from "../components/datatable/DatatableOpenningBike"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminToken } from '../../../utils/localStorage';

const OpenningBike = () => {
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
        <DatatableOpenningBike/>
      </div>
    </div>
  )
}

export default OpenningBike