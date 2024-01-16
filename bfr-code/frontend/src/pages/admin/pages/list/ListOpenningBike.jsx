import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import DatatableOpenningBike from "../../components/datatable/DatatableOpenningBike"

const ListOpenningBike = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <DatatableOpenningBike/>
      </div>
    </div>
  )
}

export default ListOpenningBike