"use client"
import {useState, useEffect} from 'react'
import apiRequest from '@/lib/api';

export default function ProfilePage(){
    const [profile, setProfile] = useState({
        name: "",
        userId: "",
        password: "",
    })

    useEffect(() =>{
        // Hydrate state from localStorage on component mount
        setProfile((prev) =>({
            ...prev,
            userId: localStorage.getItem('useId') || "",
            name: localStorage.getItem('name') || ""
        }))
    }, [])

    async function handleUpdate(e){
        e.preventDefault(); // Stops the page from refreshing
        console.log("Attempting update for ID:", profile.userId);
        try{
            const body = {name: profile.name}

            if(profile.password){
                body.password = profile.password
            }
            
            await apiRequest(`/users/${profile.userId}`, {
                method: 'PUT',
                body: body
            })
             
            // Update the local Memory to the header shows the new name 
            localStorage.setItem('name', profile.name);
            alert("Profile Updated Successfully")

            if(profile.password){
                localStorage.clear();
                window.location.href = '/'
            }
        }catch(err){
            alert("Failed to update", err.message);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh] p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Profile Settings</h2>
                
                <form onSubmit={handleUpdate} className="space-y-5">
                    {/* User ID - Read Only */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-600">User ID</label>
                        <input 
                            type="text" 
                            value={profile.userId} 
                            disabled 
                            className="w-full p-2 bg-gray-50 border rounded cursor-not-allowed text-gray-400 font-mono text-sm" 
                        />
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-600">Full Name</label>
                        <input 
                            type="text" 
                            value={profile.name} 
                            required
                            placeholder="Enter your name"
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-600">New Password</label>
                        <input 
                            type="password" 
                            placeholder="Leave blank to keep current"
                            value={profile.password}
                            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                        />
                        <p className="text-[10px] text-gray-400 mt-1 italic font-medium">
                            * For security, you will be logged out after a password change.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md active:scale-95"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}