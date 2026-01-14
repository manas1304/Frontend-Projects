"use client"
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Navbar(){
    const router = useRouter();
    const [userName, setUserName] = useState('');

    useEffect(() =>{
        //1. Fetch the userName from the localStorage
        const name = localStorage.getItem('name');
        if(name) setUserName(name);
    }, []); // Empty dependency array means runs once on mount phase only.

    function handleLogout(){
        //1. Clear all session data
        localStorage.clear();
        //2. Redirect to the login page
        router.push('/login');
    }

    return (
        <nav className="bg-white border-b h-16 flex items-center justify-between px-8 shadow-sm">
            <div className="text-gray-500 font-medium">
                Welcome back, <span className="text-blue-600 font-bold">{userName}</span>
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 transition font-medium"
            >
                Logout
            </button>
        </nav>
    )
}