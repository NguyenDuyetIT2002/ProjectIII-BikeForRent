import React from 'react'
import { useState, useEffect} from 'react';
import { ImagetoBase64 } from "../ultility/ImagetoBase64";
import axiosConfig from '../axiosConfig';
import { useNavigate } from 'react-router';
import {useSelector} from 'react-redux';

function EditBikeForm({bikeInfo}) {
    const [inputs, setInputs] = useState({
        bikeName: '',
        bikeType: '',
        bikePrice: '',
        bikeImage: '',
        bikeDescription: '',
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
            const response = await axiosConfig.put(`/updateBikeInfo/${bikeInfo._id}`, {
                name: inputs.bikeName,
                type: inputs.bikeType,
                price: inputs.bikePrice,
                owner_id : manager_id,
                image: inputs.bikeImage,
                description: inputs.bikeDescription 
            });
            console.log('Before navigate');
            navigate('/manager/homepage');
            console.log('After navigate');
        } catch (error) {
            console.log("Edit bikes failed: ", error);
        }
        
    }

    useEffect( () => {
        if (bikeInfo) {
            setInputs({
                bikeName: bikeInfo.name,
                bikeType: bikeInfo.type,
                bikePrice: bikeInfo.price,
                bikeImage: bikeInfo.image,
                bikeDescription: bikeInfo.description,
            });
        }
      }, []);

    return (
        <div className='w-96'>
            <form className='w-full mx-auto space-y-5' onSubmit={submitForm}>
                <div>
                    <label htmlFor='bikeName'>Bike name</label>
                    <input type='text' name='bikeName' value={inputs.bikeName} className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor='bikeType'>Bike type</label>
                    <input type='text' name='bikeType' value={inputs.bikeType} className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor='bikePrice'>Rent price(VND)</label>
                    <input type='text' name='bikePrice' value={inputs.bikePrice} className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
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
                    <input type='text' name='bikeDescription' value={inputs.bikeDescription} className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
                </div>

                <button type='submit' className='px-2 py-1 border border-black rounded-lg'>Submit</button>
            </form>
        </div>
    )
}

export default EditBikeForm