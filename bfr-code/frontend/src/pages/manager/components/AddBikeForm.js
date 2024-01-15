import React from 'react'
import { useState } from 'react';
import { ImagetoBase64 } from "../ultility/ImagetoBase64";
import axiosConfig from '../axiosConfig';
import {useSelector} from 'react-redux';
import { showToast } from "../../../utils/toast";
import { useNavigate } from 'react-router-dom';

function AddBikeForm() {
    const [inputs, setInputs] = useState({
        bikeName: "",
        bikeType: "",
        bikePrice: "",
        bikeImage: "",
        bikeDescription: "",
    });
    const manager_id = useSelector(state => {
        //console.log(state.manager.managerInfo._id);
        return state.manager.managerInfo._id;
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
        event.preventDefault();
        try {
            const response = await axiosConfig.post('/createBike', {
                name: inputs.bikeName,
                type: inputs.bikeType,
                price: inputs.bikePrice,
                owner_id : manager_id,
                image: inputs.bikeImage,
                description: inputs.bikeDescription 
            });
            showToast("success", "Thêm xe thành công");
            setTimeout(() => {
                navigate("/manager/homepage");
            }, 3000);
        } catch (error) {
            //console.log("Add bikes failed: ", error);
            showToast("error", "Thêm xe thất bại");
        }
    }

    return (
        <div className='w-96'>
            <form className='w-full mx-auto space-y-5' onSubmit={submitForm}>
                <div>
                    <label htmlFor='bikeName'>Bike name</label>
                    <input type='text' name='bikeName' className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor='bikeType'>Bike type</label>
                    <input type='text' name='bikeType' className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor='bikePrice'>Rent price(VND)</label>
                    <input type='text' name='bikePrice' className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor='bikeImage'>Bike image</label>
                    {inputs.bikeImage ? (
                        <img src={inputs.bikeImage} alt={"none"} className="h-full" />
                    ) : (
                        <span className="text-5xl"></span>
                    )}
                    <input type="file" name='bikeImage' /*className='block w-full p-2 border border-black rounded-lg'*/ onChange={uploadImage}/>
                </div>

                <div>
                    <label htmlFor='bikeDescription'>Description</label>
                    <input type='text' name='bikeDescription' className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
                </div>

                <button type='submit' className='px-2 py-1 border border-black rounded-lg'>Submit</button>
            </form>
        </div>
    )
}

export default AddBikeForm