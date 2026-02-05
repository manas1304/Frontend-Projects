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
            console.log("Backend Response", response)
            //2. Redirect based on role
            const role = response.userType?.toLowerCase();
            console.log("Redirecting to:", `/${role}`);
            if(role) router.push(`/${role}`);

        }catch(err){
            setError(err.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <form
                onSubmit={handleSubmit}
                className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md rounded-lg w-96"
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-foreground">CRM Login</h1>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input 
                    type="text"
                    placeholder="User Id"
                    required
                    onChange={(e) => setFormData({...formData, userId: e.target.value})}
                    className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                />
                <input 
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
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