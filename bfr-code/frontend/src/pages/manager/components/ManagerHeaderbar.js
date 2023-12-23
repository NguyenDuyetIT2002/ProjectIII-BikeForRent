import React from 'react'
import { Link } from 'react-router-dom'

const ManagerHeaderbar = () => {
  return (
    <>
        <div className='flex flex-row justify-between border-b-2 border-solid border-black'>
            <div className='bg-black'>
                <div className='m-10  text-white'>Logo here</div>
            </div>
            <Link to={""} className='bg-black hover:bg-black'>
                <div className='m-10 text-white'>Log out</div>
            </Link>
        </div>
    </>
  )
}

export default ManagerHeaderbar