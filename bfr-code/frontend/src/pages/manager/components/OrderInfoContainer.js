import React from "react";
import dayjs from "dayjs";
const OrderInfoContainer = ({ orderInfo, handelOnClick }) => {
  return (
    <div className="flex flex-row my-10 p-10 border-2 border-black rounded-lg">
      <table className="table ml-10">
        <tbody>
          <tr>
            <td>Người thuê: {orderInfo.customer_name}</td>
          </tr>
          <tr>
            <td>Xe thuê: {orderInfo.bike_id}</td>
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
          <tr>
            {orderInfo.status === "pending" && (
              <td>
                <button
                  className="px-2 py-1 border-2 border-black rounded-lg"
                  onClick={() => handelOnClick(orderInfo._id)}
                >
                  Accept
                </button>
              </td>
            )}
            {orderInfo.status === "accepted" && (
              <td>
                <button
                  className="px-2 py-1 border-2 border-black rounded-lg"
                  onClick={() => handelOnClick(orderInfo._id)}
                >
                  Complete
                </button>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderInfoContainer;
