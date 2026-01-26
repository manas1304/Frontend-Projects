"use client";
import TicketComments from "./TicketComments";

export default function TicketDetailsModal({ isOpen, onClose, ticket }) {
  // If not open or no ticket data, don't show anything
  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl">✕</button>
        
        <h2 className="text-2xl font-bold border-b pb-2">{ticket.title}</h2>
        
        <div className="my-4">
          <p className="text-sm font-semibold text-gray-500 uppercase">Description</p>
          <p className="text-gray-800">{ticket.description}</p>
        </div>

        {/* Integration of the Discussion section */}
        <TicketComments ticketId={ticket._id} />
      </div>
    </div>
  );
}