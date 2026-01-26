"use client";
import { useState, useEffect } from "react";
import apiRequest from "@/lib/api";
import TicketDetailModal from "@/components/TicketDetailsModal";

export default function AssignedTickets() {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyTickets() {
      try {
        const allTickets = await apiRequest("/tickets", { method: "GET" });
        const myId = localStorage.getItem("userId");

        setTickets(allTickets.filter((t) => t.assignee === myId));
      } catch (err) {
        console.log("Failed to fetch tickets");
      } finally {
        setLoading(false);
      }
    }
    fetchMyTickets();
  }, []);

  

  const filteredTickets = tickets.filter(t =>
    t.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  // During re-render filtercode runs again as soon the the searchTerm state variable is updated from the input.

  if (loading) return <div className="p-6">Loading your tasks</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assigned Tickets</h1>
        <input
          type="text"
          placeholder="Search by title..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-64"
        />
      </div>
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3 font-semibold">Title</th>
            <th className="p-3 font-semibold">Reporter</th>
            <th className="p-3 font-semibold">Priority</th>
            <th className="p-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket._id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{ticket.title}</td>
              <td className="p-3">{ticket.reporter}</td>
              <td className="p-3">{ticket.ticketPriority}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
      {/**New Modal Component */}
      <TicketDetailModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
}
