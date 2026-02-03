"use client";
import { useState, useEffect } from "react";
import apiRequest from "@/lib/api";
import TicketDetailsModal from '@/components/TicketDetailsModal'
import Loading from '@/components/Loading'

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // New State for Discussion Modal
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [engineers, setEngineers] = useState([]);
  useEffect(() =>{
    async function fetchEngineers(){
      const allUsers = await apiRequest('/users', {method: 'GET'});
      // Filtering only engineers for this with status = approved
      setEngineers(allUsers.filter(u => u.userType ==='ENGINEER' && u.userStatus === 'APPROVED'));
    }
    fetchEngineers();
  }, []); // Runs once only on the mount phase

  async function fetchTickets() {
      setIsLoading(true); // Show spinner before the request
      try {
        const data = await apiRequest("/tickets", { method: "GET" });
        setTickets(data);
      } catch (err) {
        console.log("Error occured while fetching tickets", err);
      } finally {
        setIsLoading(false);
      }
    }

  useEffect(() => {
    fetchTickets();
  }, []); // Empty dependency array means runs only once on the mount phase.


  async function handleAssign(ticketId, engineerId){
    try{
      console.log(`Updating ticket ${ticketId} with assignee ${engineerId}`);
      await apiRequest(`/tickets/${ticketId}`, {
        method: "PUT",
        body: JSON.stringify({assignee: engineerId})
      })
      alert(`Ticket assigned to ${engineerId}`);
      fetchTickets();
    }catch(err){
      console.log("Failed to Assign", err);
    }
  }


  async function updateTicket(ticketId, updatedData) {
    try {
      await apiRequest(`/tickets/${ticketId}`, {
        method: "PUT",
        body: updatedData,
      });
      // Update local state to see changes instantly
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? { ...t, ...updatedData } : t)),
      );
      alert("Ticket Updated");
    } catch (err) {
      console.log("Error while updating the ticket", err);
      alert("Update Failed");
    }
  }

  // Open Modal Handler
  function handleViewTicket(ticket) {
    console.log("Comments section required by the user", ticket._id);
    setSelectedTicket(ticket);
    setIsViewModalOpen(true);
  }

  if (isLoading) return <Loading />

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
            <th className="p-3 font-semibold text-gray-600">View</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{ticket.title}</td>
              <td className="p-3 text-gray-600">{ticket.reporter}</td>
              <td className="p-3 text-gray-600">
                <select
                  value={ticket.assignee || ""}
                  onChange={(e) => handleAssign(ticket._id, e.target.value)}
                  className="border rounded p-1 text-sm"
                >
                  <option value="Unassigned">Unassigned</option>
                  {
                    engineers.map((eng) => (
                      <option key={eng.userId} value={eng.userId}>{eng.name}({eng.userId})</option>
                    ))
                  }
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
              {/* NEW CELL WITH EYE BUTTON */}
              <td className="p-3 text-center">
                <button
                  onClick={() => handleViewTicket(ticket)}
                  className="text-blue-600 hover:text-blue-800 text-xl"
                >
                  👁️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/**New Modal Component */}
      <TicketDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
}
