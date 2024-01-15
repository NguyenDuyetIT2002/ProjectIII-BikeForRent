import React from 'react';

const OrderInfoContainer = ({orderInfo, handelOnClick}) => {
    function getDateTime(timeStr) {
        const dateTime = timeStr.split('T');
        const date = dateTime[0].split('-');
        const time = dateTime[1].split('.')[0];
        return `${time} ${date[2]}-${date[1]}-${date[0]}`;
    }

    return (
        <div className="flex flex-row my-10 p-10 border-2 border-black rounded-lg">
            <table className='table ml-10'>
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
                    <tr>
                        {orderInfo.status === 'pending' && 
                        <td>
                            <button className='px-2 py-1 border-2 border-black rounded-lg' onClick={() => handelOnClick(orderInfo._id)}>
                                Accept
                            </button>
                        </td>
                        }
                        {orderInfo.status === 'accepted' && 
                        <td>
                            <button className='px-2 py-1 border-2 border-black rounded-lg' onClick={() => handelOnClick(orderInfo._id)}>
                                Complete
                            </button>
                        </td>
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default OrderInfoContainer;
