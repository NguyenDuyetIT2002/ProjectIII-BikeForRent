import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBikeForm() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));
    }

    const submitForm = (event)=>{
        console.log(inputs);
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
                    <input type='text' name='bikeImage' className='block w-full p-2 border border-black rounded-lg' onChange={handleChange}/>
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