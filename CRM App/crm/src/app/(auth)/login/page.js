"use client";
import {useState} from 'react'
import {useRouter} from 'next/navigation';
import apiRequest from '@/lib/api';
import Link from 'next/link';

export default function LoginPage(){
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        userId: '',
        password: ''
    });
    const router = useRouter();

    async function handleSubmit(e){
        e.preventDefault();
        setError('') // Clearing any previous errors if any from the previous function load

        try{
            const response = await apiRequest('/auth/signin', {
                method: 'POST',
                body: formData
            });
            // api request function going to the backend and providing it the type of method and the body(userId and password)
            // the response from the backend which contains accessToken, name, etc is stored as respone variable

            //1. Save to localStorage of the browser
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('name', response.name);
            localStorage.setItem('userType', response.userType);
            localStorage.setItem('userId', response.userId);

            //2. Redirect based on role
            const role = response.userType.toLowerCase();
            router.push(`/${role}`);

        }catch(err){
            setError(err.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="p-8 bg-white shadow-md rounded-lg w-96"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">CRM Login</h1>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input 
                    type="text"
                    placeholder="User Id"
                    required
                    onChange={(e) => setFormData({...formData, userId: e.target.value})}
                    className="w-full p-2 mb-4 border rounded"
                />
                <input 
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full p-2 mb-4 border rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Sign In
                </button>

                <p className="mt-4 text-sm text-center">
                    Don't have an Account? <Link className="text-blue-600" href='/signup'>SignUp</Link>
                </p>
            </form>
        </div>
    )
}