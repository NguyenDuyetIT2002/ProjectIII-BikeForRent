import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableOpenningBike from "../../components/datatable/DatatableOpenningBike"

const ListOpenningBike = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableOpenningBike/>
      </div>
    </div>
  )
}

export default ListOpenningBike