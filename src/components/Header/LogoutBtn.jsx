import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await authService.logout(); // Clear the session
            dispatch(logout()); // Update Redux state
            console.log("User logged out successfully!");
            navigate('/login'); // Redirect to login or home after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button
            className="inline-block text-black px-6 py-2 duration-200 hover:bg-blue-200 rounded-full bg-blue-400 font-semibold"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
