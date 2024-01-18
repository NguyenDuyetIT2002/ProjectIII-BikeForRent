import "./list.scss"
import Sidebar from "../components/sidebar/Sidebar"
import Datatable from "../components/datatable/Datatable"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminToken } from '../../../utils/localStorage';

const AcceptManager = () => {
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
        <Datatable/>
      </div>
    </div>
  )
}

export default AcceptManager;