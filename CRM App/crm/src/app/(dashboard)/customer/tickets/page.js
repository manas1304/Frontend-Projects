"use client";
import { useState, useEffect } from "react";
import apiRequest from "@/lib/api";
import TicketDetailsModal from '@/components/TicketDetailsModal'
import Loading from '@/components/Loading'

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // New State for Discussion Modal
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    async function getMyTickets() {
      setIsLoading(true)
      try {
        const allTickets = await apiRequest("/tickets", { method: "GET" });
        const myId = localStorage.getItem("userId");
        // Filter to show tickets only reported by this user
        setTickets(allTickets.filter((t) => t.reporter === myId));
      } catch (err) {
        console.log("Failed to get your tickets", err);
      } finally {
        setIsLoading(false);
      }
    }
    getMyTickets();
  }, []);

  // Open Modal Handler
  function handleViewTicket(ticket) {
    console.log("Comments section required by the user", ticket._id);
    setSelectedTicket(ticket);
    setIsViewModalOpen(true);
  }

  if (isLoading)
    return (
      <Loading />
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Ticket History</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Title</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Priority</th>
              <th className="p-4 font-semibold text-gray-700">Assignee</th>
              <th className="p-4 font-semibold">View</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-large">{t.title}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      t.status === "OPEN"
                        ? "bg-blue-100 text-blue-700"
                        : t.status === "CLOSED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="p-4 text-gray-600">P{t.ticketPriority}</td>
                <td className="p-4 text-gray-500 italic">
                  {t.assignee || "Waiting for Assignment"}
                </td>
                {/* NEW CELL WITH EYE BUTTON */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleViewTicket(t)}
                    className="text-blue-600 hover:text-blue-800 text-xl"
                  >
                    👁️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <p className="p-10 text-center text-gray-400">No tickets found.</p>
        )}
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
