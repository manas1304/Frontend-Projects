"use client"
import {useState} from 'react';
import apiRequest from '@/lib/api';

export default function CreateTicketModal({isOpen, onClose, onRefresh}){
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ticketPriority: 4 // Default Priority
    });

    if(!isOpen) return null;

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await apiRequest('/tickets', {
                method: 'POST',
                body: formData
            })
            alert("Ticket Created Successfully");
            onRefresh();
            onClose();
        }catch(err){
            console.log("Error while creating ticket", err);
            alert("Failed to create ticket" + err.message);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Raise New Ticket</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            required
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea 
                            required
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full border p-2 rounded h-24"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">Priority(1-4)</label>
                        <select
                            onChange={(e) => setFormData({...formData, ticketPriority: Number(e.target.value)})}
                            className="w-full border p-2 rounded"
                        >
                            <option value="4">4 (Low)</option>
                            <option value="3">3 (Medium)</option>
                            <option value="2">2 (High)</option>
                            <option value="1">1 (Critical)</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}