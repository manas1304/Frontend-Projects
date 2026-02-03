"use client";
import { useState, useEffect } from "react";
import apiRequest from "@/lib/api";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      const userId = localStorage.getItem("userId");
      const data = await apiRequest(`/notifications/${userId}`, { method: "GET" });
      setNotifications(data);
    }
    fetchNotifications();
  }, []);

  // 1. Mark Single as Read
  const handleMarkAsRead = async (id) => {
    try {
      await apiRequest(`/notifications/${id}/read`, { method: "PUT" });
      setNotifications(notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  // 2. NEW: Mark All as Read
  const handleMarkAllAsRead = async () => {
    const userId = localStorage.getItem("userId");
    try {
      // Assuming you add an endpoint for bulk update
      await apiRequest(`/notifications/readAll/${userId}`, { method: "PUT" });
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 text-2xl outline-none">
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Header with Mark All button */}
          <div className="p-3 border-b flex justify-between items-center bg-gray-50">
            <span className="font-bold text-gray-700">Notifications</span>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllAsRead} className="text-[11px] text-blue-600 hover:underline">
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">No notifications yet</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => !n.isRead && handleMarkAsRead(n._id)}
                className={`p-4 border-b text-sm cursor-pointer transition ${!n.isRead ? "bg-blue-50 hover:bg-blue-100" : "bg-white"}`}
              >
                <p className={`${!n.isRead ? "font-bold text-gray-900" : "text-gray-500"}`}>{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}