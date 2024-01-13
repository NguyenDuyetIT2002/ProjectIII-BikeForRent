import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import DatatableBanningUser from "../../components/datatable/DatatableBanninguser"

const ListBanningUsers = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <DatatableBanningUser/>
      </div>
    </div>
  )
}

export default ListBanningUsers