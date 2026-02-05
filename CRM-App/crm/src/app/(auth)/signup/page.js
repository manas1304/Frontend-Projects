"use client"
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import apiRequest from '@/lib/api';
import Link from 'next/link'

export default function SignupPage(){
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '', userId: '', password: '', userType: 'CUSTOMER' });
    const [error, setError] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        setError('');
        try{
            await apiRequest('/auth/signup', { method: 'POST', body: formData });
            router.push('/login');
        } catch(err){ setError(err.message); }
    }

    return (
        
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">  
            <form onSubmit={handleSubmit}
                
                className="p-8 bg-white shadow-md border border-gray-100 rounded-lg w-96"
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Create CRM Account</h1>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                
                <input 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    type="text" placeholder='Full Name' required
                    className="w-full p-2 mb-4 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    onChange={(e) => setFormData({...formData, userId: e.target.value})}
                    type="text" placeholder="UserId (unique)" required
                    className="w-full p-2 mb-4 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    type="email" placeholder='Email' required
                    className="w-full p-2 mb-4 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <input 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    type="password" placeholder="Password" required
                    className="w-full p-2 mb-4 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    onChange={(e) => setFormData({...formData, userType: e.target.value})}
                    
                    className="w-full p-2 mb-6 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="ENGINEER">ENGINEER</option>
                </select>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-medium transition-colors">
                    Sign Up
                </button>
                <p className="mt-4 text-md text-center text-gray-600">
                    Already have an Account? <Link className="text-blue-600 hover:underline" href='/login'>Login</Link>
                </p>
            </form>
        </div>
    )
}