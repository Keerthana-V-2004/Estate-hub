import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form className='gap-4 flex flex-col'>
       <img src={currentUser.avatar} alt='avatar' className='w-24 h-24 rounded-full object-cover mx-auto mb-5 cursor-pointer self-center'/>

       <input type='text' placeholder='username' id='username' className='w-full p-3 rounded-lg mb-4 focus:outline-none' readOnly/>
       
       <input type='email' placeholder='email' 
       id='email'  className='w-full p-3 rounded-lg  mb-4 focus:outline-none' readOnly/> 

       <input type='email' placeholder='password' 
       id='password'className='w-full p-3 rounded-lg  mb-4 focus:outline-none' readOnly/>  

       <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>

       <div className='justify-between flex'>
        <span className='text-red-700 cursor-pointer '>Delete account</span>
        <span className='text-red-700 cursor-pointer '>Log out</span>
        </div>

    </form>

    </div>
    
  )
}
