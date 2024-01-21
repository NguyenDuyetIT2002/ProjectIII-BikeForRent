import React from 'react';

const AcceptedOrderContainer = ({orderInfo, handelOnClick}) => {
    function getDateTime(timeStr) {
        const dateTime = timeStr.split('T');
        const date = dateTime[0].split('-');
        const time = dateTime[1].split('.')[0].split(':');
        var hour = parseInt(time[0], 10) + 7;
        var minute = parseInt(time[1], 10);
        var second = parseInt(time[2], 10);
        var day = parseInt(date[2], 10);
        var month = parseInt(date[1], 10);
        var year = parseInt(date[0], 10); 
        if (hour >= 24) {
            hour -= 24;
            day += 1;

            if (day == 29){
                if (month == 2) {
                    if (year % 4 == 0){
                        if (year % 100 == 0 && year % 400 != 0){
                            day = 1;
                            month = 3;
                        }
                    }
                    else {
                        day = 1;
                        month = 3;
                    }
                }
            } 
            else if (day == 30){
                if (month == 2) {
                    day = 1;
                    month = 3;
                }
            }
            else if (day == 31){
                if (month == 4 || month == 6 || month == 9 || month == 11){
                    day = 1;
                    month += 1;
                }
            }
            else if (day == 32){
                day = 1;
                month += 1;
                if (month > 12) {
                    month = 1
                    year += 1;
                }
            }

        }

        if (hour >= 10)hour = hour.toString();
        else hour = '0' + hour.toString();

        if (day >= 10)day = day.toString();
        else day = '0' + day.toString();

        if (month >= 10)month = month.toString();
        else month = '0' + month.toString();

        return `${hour}:${minute}:${second} ${day}-${month}-${year}`;
    }

    return (
        <div className="flex flex-col my-10 border border-black rounded-lg">
            <table className='table ml-10 m-5'>
                <tbody>
                    <tr>
                        <td>Người thuê: {orderInfo.customer_name}</td>
                    </tr>
                    <tr>
                        <td>Xe thuê: {orderInfo.bike_id}</td>
                    </tr>
                    <tr>
                        <td>Bắt đầu thuê: {getDateTime(orderInfo.startTime)}</td>
                    </tr>
                    <tr>
                        <td>Kết thúc thuê: {getDateTime(orderInfo.endTime)}</td>
                    </tr>
                    <tr>
                        <td>Chi phí (VND): {orderInfo.price}.000</td>
                    </tr>
                    <tr>
                        <td>Trạng thái: {orderInfo.status}</td>
                    </tr>
                </tbody>
            </table>
            <button className='h-10 bg-green-300 hover:bg-green-500 rounded-b-lg text-lg font-medium' onClick={() => handelOnClick(orderInfo._id)}>
                Hoàn thành
            </button>
        </div>
    );
}

export default AcceptedOrderContainer;
