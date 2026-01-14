"use client"
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({children}){
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() =>{
        //1. Protection - Check if the user is Logged in on mounting phase
        const token = localStorage.getItem('accessToken');
        if(!token){
            router.push('/login');
        }else{
            setIsLoaded(true);
        }
    }, [router]);

    if(!isLoaded){return <div className="h-screen flex items-center justify-center">Loading</div>}

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* 2. Fixed Sidebar */}
            <Sidebar />
            <div className="flex flex-col flex-1">
                {/* 3. Top Navbar */}
                <Navbar />

                {/* 4. Page Content */}
                <main className="p-6 overflow-y-auto">{children}</main>

            </div>
        </div>
    )
}