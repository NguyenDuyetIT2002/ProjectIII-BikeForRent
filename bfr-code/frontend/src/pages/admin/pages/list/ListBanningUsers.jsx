import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableBanningUser from "../../components/datatable/DatatableBanninguser"

const ListBanningUsers = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableBanningUser/>
      </div>
    </div>
  )
}

export default ListBanningUsers