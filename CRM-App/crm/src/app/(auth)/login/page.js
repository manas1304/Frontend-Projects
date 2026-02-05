"use client";
import {useState} from 'react'
import {useRouter} from 'next/navigation';
import apiRequest from '@/lib/api';
import Link from 'next/link';

export default function LoginPage(){
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ userId: '', password: '' });
    const router = useRouter();

    async function handleSubmit(e){
        e.preventDefault();
        setError('');
        try{
            const response = await apiRequest('/auth/signin', { method: 'POST', body: formData });
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('name', response.name);
            localStorage.setItem('userType', response.userType);
            localStorage.setItem('userId', response.userId);
            const role = response.userType?.toLowerCase();
            if(role) router.push(`/${role}`);
        } catch(err){ setError(err.message); }
    }

    return (
        
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                
                className="p-8 bg-white shadow-md border border-gray-100 rounded-lg w-96"
            >
                
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">CRM Login</h1>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input 
                    type="text"
                    placeholder="User Id"
                    required
                    onChange={(e) => setFormData({...formData, userId: e.target.value})}
                    
                    className="w-full p-2 mb-4 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full p-2 mb-4 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-medium transition-colors">
                    Sign In
                </button>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an Account? <Link className="text-blue-600 hover:underline" href='/signup'>SignUp</Link>
                </p>
            </form>
        </div>
    )
}