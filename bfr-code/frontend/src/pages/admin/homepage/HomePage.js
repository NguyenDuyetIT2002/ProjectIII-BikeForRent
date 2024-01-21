import Sidebar from "../components/sidebar/Sidebar";
import "./HomePage.scss";
import Widget from "../components/widget/Widget";
import Chart from "../components/chart/Chart";

const AdminHomePage = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;