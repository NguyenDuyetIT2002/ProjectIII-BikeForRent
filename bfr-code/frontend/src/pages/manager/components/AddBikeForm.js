import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagetoBase64 } from "../ultility/ImagetoBase64";
import axiosConfig from '../axiosConfig';



function AddBikeForm() {
    const [inputs, setInputs] = useState({
        bikeName: "",
        bikeType: "",
        bikePrice: "",
        bikeImage: "",
        bikeDescription: "",
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));
    }

    const uploadImage = async (event) => {
        const data = await ImagetoBase64(event.target.files[0]);
        setInputs(values => ({...values, bikeImage: data}));

      };

    const submitForm = async (event)=>{
        try {
            const response = await axiosConfig.post('/createBike', {
                name: inputs.bikeName,
                type: inputs.bikeType,
                price: inputs.bikePrice,
                owner_id : '65a27039c089180b474336a4',
                image: inputs.bikeImage,
                description: inputs.bikeDescription 
            });
            console.log(response.data)
        } catch (error) {
            console.log("Add bikes failed: ", error);
        }
        navigate('/manager/homepage');
    }

    return (
        <div className='w-96'>
            <form className='w-full mx-auto space-y-5' onSubmit={submitForm}>
                <div>
                    <label for='bikeName'>Bike name</label>
                    <input type='text' name='bikeName' className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
                </div>

                <div>
                    <label for='bikeName'>Bike type</label>
                    <input type='text' name='bikeType' className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
                </div>

                <div>
                    <label for='bikeName'>Rent price(VND)</label>
                    <input type='text' name='bikePrice' className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
                </div>

                <div>
                    <label for='bikeName'>Bike image</label>
                    {inputs.bikeImage ? (
                        <img src={inputs.bikeImage} alt={"none"} className="h-full" />
                    ) : (
                        <span className="text-5xl"></span>
                    )}
                    <input type="file" name='bikeImage' /*className='block w-full p-2 border border-black rounded-lg'*/ onChange={uploadImage}/>
                </div>

                <div>
                    <label for='bikeName'>Description</label>
                    <input type='text' name='bikeDescription' className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
                </div>

                <button type='submit' className='px-2 py-1 border border-black rounded-lg'>Submit</button>
            </form>
        </div>
    )
}

export default AddBikeForm