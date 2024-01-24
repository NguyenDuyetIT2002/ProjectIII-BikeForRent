import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import axiosConfig from '../../axiosConfig';

const CustomerRentedBike = () => {
    const userInfo = useSelector((state) => state.customer.customerInfo);
    const [rentedBikes, setRentedBikes] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosConfig.get(`/customer/getYourRentedBike/${userInfo._id}`);
                if (response.status === 200) {
                    setRentedBikes(response.data.data);
                } else {
                    console.error("Error fetching rented bikes:", response.data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (userInfo && userInfo._id) {
            fetchData();
        }
    }, [userInfo]);

    return (
        <div>
            <div className="flex">
                <Sidebar />
                {/* Hiển thị thông tin về các xe đã thuê ở đây */}
                <ul>
                    {rentedBikes.map((bike) => (
                        <li key={bike._id}>
                            <h3>{bike.name}</h3>
                            <p>{bike.type}</p>
                            <p>{bike.description}</p>
                            {/* Hiển thị các thông tin khác về xe đã thuê */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CustomerRentedBike;

