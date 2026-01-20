"use client";
import { useState, useEffect } from "react";
import apiRequest from '@/lib/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
    blocked: 0,
  });

  useEffect(() =>{
    async function fetchStats(){
      try{
        const allTickets = await apiRequest('/tickets', {method: 'GET'});

        // Calculate count based on ticket status
        setStats({
          total: allTickets.length,
          open: allTickets.filter(t => t.status === 'OPEN').length,
          closed: allTickets.filter(t => t.status === 'CLOSED').length,
          blocked: allTickets.filter(t => t.status === 'BLOCKED').length
        })

      }catch(err){
        console.log("Failed to Fetch Stats");
        alert("Failed to Fetch Stats");
      }
    }
    fetchStats();
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Overview</h1>

      {/* Quick Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-blue-600 font-bold text-xl">Total Tickets</p>
          <p className="text-3xl font-black">{stats.total}</p>
        </div>
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-yellow-600 font-bold text-xl">Open</p>
          <p className="text-3xl font-black">{stats.open}</p>
        </div>
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-green-600 font-bold text-xl">Closed</p>
          <p className="text-3xl font-black">{stats.closed}</p>
        </div>
        <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg text-center">
          <p className="text-purple-600 font-bold text-xl">Blocked</p>
          <p className="text-3xl font-black">{stats.blocked}</p>
        </div>

      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>
        <p className="text-gray-600 italic">Welcome to the Admin portal. Use the sidebar to manage users or tickets.</p>
      </div>
    </div>
  );
}
