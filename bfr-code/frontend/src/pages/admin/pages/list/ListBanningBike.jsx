import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import DatatableBanningBike from "../../components/datatable/DatatableBanningBike"

const ListBanningBike = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <DatatableBanningBike/>
      </div>
    </div>
  )
}

export default ListBanningBike