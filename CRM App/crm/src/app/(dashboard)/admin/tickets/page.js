"use client";
import { useState, useEffect } from "react";
import apiRequest from "@/lib/api";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const data = await apiRequest("/tickets", { method: "GET" });
        setTickets(data);
      } catch (err) {
        console.log("Error occured while fetching tickets", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, []); // Empty dependency array means runs only once on the mount phase.

  async function updateTicket(ticketId, updatedData){
    try{
      await apiRequest(`/tickets/${ticketId}`,{
        method: 'PUT',
        body: updatedData
      })
      // Update local state to see changes instantly
      setTickets(prev => prev.map(t => t._id === ticketId? {...t, ...updatedData}: t))
      alert("Ticket Updated")
    }catch(err){
        console.log("Error while updating the ticket", err);
        alert("Update Failed")
    }
  }

  if (loading) return <div>Loading Tickets...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h1 className="text-2xl font-bold mb-6">All Support Tickets</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3 font-semibold text-gray-600">Title</th>
            <th className="p-3 font-semibold text-gray-600">Requester</th>
            <th className="p-3 font-semibold text-gray-600">Assignee</th>
            <th className="p-3 font-semibold text-gray-600">Status</th>
            <th className="p-3 font-semibold text-gray-600">Priority</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{ticket.title}</td>
              <td className="p-3 text-gray-600">{ticket.reporter}</td>
              <td className="p-3 text-gray-600">
                <select
                  value={ticket.assignee || ''}
                  onChange={(e) => updateTicket(ticket._id, {assignee: e.target.value})}
                  className="border rounded p-1 text-sm"
                >
                  <option>Unassigned</option>
                  {/* We would map your engineers here later */}
                  <option>Eng 1</option>
                  <option>Eng 2</option>
                </select>
              </td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    ticket.status === "OPEN"
                      ? "bg-blue-100 text-blue-700"
                      : ticket.status === "CLOSED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="p-3">{ticket.ticketPriority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
