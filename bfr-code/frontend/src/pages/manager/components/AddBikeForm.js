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
        <div className='w-100%'>
            <form className='flex flex-wrap -mx-3' onSubmit={submitForm}>
                <div className='w-full md:w-1/2 px-2 mb-6 md:mb-0'>
                    <div className='mb-4'>
                        <label htmlFor='bikeName' className='block text-gray-700 text-sm font-bold mb-2'>Tên xe</label>
                        <input type='text' name='bikeName' placeholder='Nhập tên xe' required className="border rounded-md py-2 px-3 w-full" onChange={handleChange}/>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='bikeType' className='block text-gray-700 text-sm font-bold mb-2'>Loại xe</label>
                        <input type='text' name='bikeType' placeholder='Nhập loại xe' required className="border rounded-md py-2 px-3 w-full" onChange={handleChange}/>
                    </div>

                    <div>
                        <label htmlFor='bikePrice' className='block text-gray-700 text-sm font-bold mb-2'>Giá thuê(VND)</label>
                        <input type='text' name='bikePrice' placeholder='Nhập giá thuê xe' required className="border rounded-md py-2 px-3 w-full" onChange={handleChange}/>
                    </div>
                </div>

                <div className='w-full md:w-1/2 mb-6 md:mb-0'>
                    <div className='mb-4'>
                        <label htmlFor='bikeImage' className="block text-gray-700 text-sm font-bold">Hình ảnh xe</label>
                        {inputs.bikeImage ? (
                            <img src={inputs.bikeImage} alt={"none"} className="h-full" />
                        ) : (
                            <span className="text-5xl"></span>
                        )}
                        <input type="file" name='bikeImage' onChange={uploadImage}/>
                    </div>

                    <div>
                        <label htmlFor='bikeDescription' className="block text-gray-700 text-sm font-bold mb-2">Mô tả</label>
                        <input type='text' name='bikeDescription' className="border rounded-md py-2 px-3 w-full" onChange={handleChange}/>
                    </div>
                </div>
                <button type='submit' className="bg-blue-500 text-white rounded-md py-4 px-8 mt-5 mx-auto block hover:bg-blue-600 transition duration-300">Thêm xe</button>
            </form>
        </div>
    )
}

export default AddBikeForm