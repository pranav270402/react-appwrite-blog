import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import { login } from '../store/authSlice'
import {Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
  const navigate= useNavigate()
  const [error, setError]= useState("")
  const dispatch= useDispatch()
  const {register, handleSubmit}= useForm()

  const signup = async (data)=> {
    setError("")
    try {
      const userData= await authService.createAccount(data)
      if (userData) {
        const userData= await authService.getCurrentUser()
        if(userData) dispatch(login(userData))
        navigate("/")
      }
    } catch (error) {
        setError(error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center bg-gray-500 m-auto p-[50px] w-fit rounded-xl'>
      <div className={`mx-auto w-full max-w-lg rounded-xl p-5 pl-12`}>
        <span className="inline-block w-full max-w-[100px]">
                <Logo />
        </span>
      </div>
      <h2 className='text-center text-3xl font-bold leading-tight'>Sign-Up to Create New Account</h2>
        <p className='mt-2 text-center text-lg font-bold text-black/60'>
            Already Have an Account? &nbsp; 
            <Link to="/login" className='text-blue-800 font-medium text-primary transition-all duration-200 hover:underline hover:text-blue-700'>Sign-In</Link>
        </p>
        {error && <p className='mt-2 text-center text-base text-red-600'>{error}</p>}
        <form onSubmit={handleSubmit(signup)}>
          <div className='space-y-5 '>
            <div className='text-start my-5 font-semibold'>
            <Input label="Full Name: " placeholder='Enter Your Full Name' 
            {...register("name", {required: true})}/>
            </div>
            <div className='text-start font-semibold'>
            <Input label="Email:" type="email" placeholder="Enter your email" {...register("email", {required: true, 
              validate:{
              matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Please enter a valid email",
              }
            })}/>
            </div>
            <div className='text-start font-semibold'>
            <Input label="Password:" type="password" placeholder="Enter your password" {...register("password", {required: true})}/>
            </div>
            <button type='submit' className='w-[150px] bg-blue-400 hover:bg-blue-200 text-black font-semibold py-2 px-4 rounded-xl'>Create Account</button>
          </div>
        </form>
    </div>
  )
}

export default Signup
