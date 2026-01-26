"use client";
import { useState, useEffect } from "react";
import apiRequest from "@/lib/api";
import TicketDetailsModal from '@/components/TicketDetailsModal'

export default function EngineerDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // New State for Discussion Modal
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    async function fetchAssignedTickets() {
      try {
        const allTickets = await apiRequest("/tickets", { method: "GET" });
        const myId = localStorage.getItem("userId");

        const assignedTickets = allTickets.filter((t) => t.assignee === myId);
        setTickets(assignedTickets);
      } catch (err) {
        console.log("Failed to fetch assigned tickets", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAssignedTickets();
  }, []);

  async function updateTicketStatus(ticketId, newStatus) {
    try {
      await apiRequest(`/tickets/${ticketId}`, {
        method: "PUT",
        body: { status: newStatus },
      });
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? { ...t, status: newStatus } : t)),
      );
    } catch (err) {
      console.log("Failed to update the status");
      alert("Status update failed");
    }
  }

  // Open Modal Handler
  function handleViewTicket(ticket) {
    console.log("Comments section required by the user", ticket._id)
    setSelectedTicket(ticket);
    setIsViewModalOpen(true);
  }

  if (loading) return <div className="p-6">Loading Assigned Tasks...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Engineer Workspace</h1>

      {/**Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
          <p className="text-sm text-gray-500 uppercase">My Active Tickets</p>
          <h2 className="text-3xl font-bold">
            {tickets.filter((t) => t.status !== "CLOSED").length}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
          <p className="text-sm text-gray-500 uppercase">Resolved By Me</p>
          <h2 className="text-3xl font-bold">
            {tickets.filter((t) => t.status === "CLOSED").length}
          </h2>
        </div>
      </div>

      {/**Task Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold">Ticket Title</th>
              <th className="p-4 font-semibold">Reporter</th>
              <th className="p-4 font-semibold">Priority</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Actions</th>
              <th className="p-4 font-semibold">View</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{ticket.title}</td>
                <td className="p-4">{ticket.reporter}</td>
                <td className="p-4">P{ticket.ticketPriority}</td>
                <td className="p-4">
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
                <td className="p-4">
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      updateTicketStatus(ticket._id, e.target.value)
                    }
                    className="border rounded p-1 text-sm bg-white"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </td>
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
      </div>
      {/**New Modal Component */}
      <TicketDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
}
