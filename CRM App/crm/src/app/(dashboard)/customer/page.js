"use client";
import { useState, useEffect } from "react";
import {useSearchParams} from 'next/navigation';
import apiRequest from '@/lib/api'
import CreateTicketModal from "@/components/CreateTicketModal";
import Loading from '@/components/Loading'

export default function CustomerDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({open: 0, resolved: 0});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    async function fetchMyTickets(){
        setIsLoading(true)
        try{
            // Fetching all tickets 
            const allTickets = await apiRequest('/tickets', {method: 'GET'});
            const myId = localStorage.getItem('userId');

            // Fetch the tickets for the current user
            const myTickets = allTickets.filter(t => t.reporter === myId);

            // Count Status
            const openCount = myTickets.filter(t => t.status !== 'CLOSED').length;
            const resolvedCount = myTickets.filter(t => t.status === 'CLOSED').length;

            setStats({open: openCount, resolved: resolvedCount});
        }catch(err){
            console.log("Failed to fetch status", err)
        }finally{
            setIsLoading(false);
        }
    }
    fetchMyTickets();
  }, [])

  //Connection the Create Ticket button to the CreateTicketModal by using URL query parameters
  const searchParams = useSearchParams();
  useEffect(() =>{
    if(searchParams.get('create') === 'true'){
      setIsModalOpen(true);
    }
  }, [searchParams]);

  if (isLoading) return <Loading />
      

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Support Overview</h1>
        <button
            onClick={() =>setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
            + Raise New Ticket
        </button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 uppercase">My Open Tickets</p>
          <h2 className="text-3xl font-bold">{isLoading ? '...' : stats.open}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500 uppercase">Resolved</p>
          <h2 className="text-3xl font-bold">{isLoading ? '...' : stats.resolved}</h2>
        </div>
      </div>
      {/*The Modal Component */}
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={() => console.log("Refreshing Data...")}
      />
    </div>
  );
}
