import React from "react";
import dayjs from "dayjs";
const PendingOrderContainer = ({ orderInfo, handelOnClick }) => {
  return (
    <>
      <div className="flex flex-col my-10 border border-black rounded-lg">
        <table className="table ml-10 m-5">
          <tbody>
            <tr>
              <td>Người thuê: {orderInfo.customer_name}</td>
            </tr>
            <tr>
              <td>Xe thuê: {orderInfo.bike_name}</td>
            </tr>
            <tr>
              <td>
                Bắt đầu thuê:{" "}
                {dayjs(orderInfo.startTime).format("YYYY-MM-DD HH:mm:ss")}
              </td>
            </tr>
            <tr>
              <td>
                Kết thúc thuê:{" "}
                {dayjs(orderInfo.endTime).format("YYYY-MM-DD HH:mm:ss")}
              </td>
            </tr>
            <tr>
              <td>Chi phí (VND): {orderInfo.price}</td>
            </tr>
            <tr>
              <td>Trạng thái: {orderInfo.status}</td>
            </tr>
          </tbody>
        </table>
        <button
          className="h-10 bg-green-300 hover:bg-green-500 rounded-b-lg text-lg font-medium"
          onClick={() => handelOnClick(orderInfo._id)}
        >
          Xác nhận
        </button>
      </div>
    </>
  );
};

export default PendingOrderContainer;
