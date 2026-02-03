"use client";
import { useState, useEffect } from "react";
import apiRequest from "@/lib/api";

export default function TicketComments({ ticketId }) {
  const [comments, setComments] = useState([]); // comments is an array that stores all the comments for a particular ticketId
  const [text, setText] = useState(""); // text - stores the current comment that is just posted by the user

  // 1. Fetch Comments
  useEffect(() => {
    async function load() {
      try {
        const data = await apiRequest(`/tickets/${ticketId}/comments`, {
          method: "GET",
        });
        setComments(data);
      } catch (err) {
        console.log("Failed to load Comments", err);
      }
    }
    if (ticketId) load();
  }, [ticketId]);

  // 2. Post new Comment
  async function submitComment() {
    if (!text.trim()) return;
    try {
      const newComment = await apiRequest(`/tickets/${ticketId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content: text }),
      });
      // Update the UI immediately
      setComments([...comments, newComment]);
      setText("");
    } catch (err) {
        alert("Error posting comment")
    }
  }

  return (
    <div className="mt-6 border-t pt-4 bg-gray-50 rounded-b-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Discussion History</h3>
      
      {/* Scrollable Comments Area */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {comments.length === 0 ? (
          <p className="text-gray-400 italic text-sm text-center">No comments yet. Start the conversation!</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                  {c.commentorId}
                </span>
                <span className="text-[10px] text-gray-400">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{c.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Input Section - Fixed Alignment */}
      <div className="flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your update here..."
          className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-20 shadow-inner"
        />
        <div className="flex justify-end">
          <button 
            onClick={submitComment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors shadow-md active:transform active:scale-95"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
  
}
