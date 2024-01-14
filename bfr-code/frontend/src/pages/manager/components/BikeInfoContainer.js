import React from 'react'

const BikeInfoContainer = (bikeInfo, {deleteBike}) => {

    return (
        <div className="flex flex-row my-10 p-10 border-2 border-black rounded-lg">

            <table className='table'>
                <tbody>
                    <tr>
                        <td>
                            <img src={bikeInfo.image} alt='Bike image'></img>                            
                        </td>
                    </tr>
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
                            <button className='px-2 py-1 border-2 border-black rounded-lg' onClick={() => { console.log('Edit') }}>
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