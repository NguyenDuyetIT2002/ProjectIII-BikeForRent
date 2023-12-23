import React from 'react'
import { Link } from 'react-router-dom'

const ManagerNavbar = () => {
  return (
    <div className='m-5 flex flex-col bg-slate-200 w-fit'>
        <Link to={""} className=' hover:bg-slate-300'>
            <div className='m-10 text-black'>Bike list</div>
        </Link>
        <Link to={""} className=' hover:bg-slate-300'>
            <div className='m-10 text-black'>Add bike</div>
        </Link>
        <Link to={""} className=' hover:bg-slate-300'>
            <div className='m-10 text-black'>Orders</div>
        </Link>
    </div>
  )
}

export default ManagerNavbar