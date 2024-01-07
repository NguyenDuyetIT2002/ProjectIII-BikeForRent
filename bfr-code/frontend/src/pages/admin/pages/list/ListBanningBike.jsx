import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableBanningBike from "../../components/datatable/DatatableBanningBike"

const ListBanningBike = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableBanningBike/>
      </div>
    </div>
  )
}

export default ListBanningBike