import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-500 rounded-xl p-10 border border-black/10`}>
        <div className="mb-6 flex justify-center ml-10">
                    <span className="inline-block w-full max-w-[100px] ">
                        <Logo />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60 font-semibold">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-800 hover:text-blue-700"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-700 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5 text-start font-semibold'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <div className='text-center'>
                <button type="submit" className="w-[100px] bg-blue-400 hover:bg-blue-200 rounded-lg text-black px-4 py-2 duration-200">
                    Sign in
                </button>
                </div>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login