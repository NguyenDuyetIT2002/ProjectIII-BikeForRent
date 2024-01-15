import React from 'react'
import { useNavigate } from 'react-router'

const BikeInfoContainer = ({bikeInfo, deleteBike}) => {
    const navigate = useNavigate();
    const handleEditClick = () => {
        // Navigate to the 'Editbike' route and pass the 'bikeInfo'
        navigate(`/manager/editbike`, { state: { bikeInfo } });
    };

    return (
        <div className="flex flex-row my-10 p-10 border-2 border-black rounded-lg">
            <img src={bikeInfo.image} alt='Bike image'></img>   
            <table className='table ml-10'>
                <tbody>
                    <tr>
                        <td>{bikeInfo.name}</td>
                    </tr>
                    <tr>
                        <td>Type: {bikeInfo.type}</td>

                    </tr>
                    <tr>
                        <td>Status: {bikeInfo.status}</td>
                    </tr>
                    <tr>
                        <td>Rent price: {bikeInfo.price}.000 VND</td>
                    </tr>
                    <tr>
                        <td>Description: {bikeInfo.description}</td>
                    </tr>
                    <tr>
                        <td>Rented by: </td>
                    </tr>
                    <tr>
                        <td>Ban Report: {bikeInfo.banRequestAmount}</td>
                    </tr>
                    <tr>
                        <td>
                            <button className='px-2 py-1 border-2 border-black rounded-lg' onClick={() => deleteBike(bikeInfo._id)}>
                                Delete
                            </button>
                        </td>

                        <td>
                            <button className='px-2 py-1 border-2 border-black rounded-lg' onClick={handleEditClick}>
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BikeInfoContainer