"use client";
import { useState, useEffect } from "react";
import apiRequest from "@/lib/api";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await apiRequest("/users", { method: "GET" });
        console.log(data);
        setUsers(data);
      } catch (err) {
        console.log("Error while fetching data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []); // Empty dependency array means runs once on mounting phase

  async function handleStatusChange(userId, newStatus){
    try{
        await apiRequest(`/users/${userId}`, {
            method: 'PUT',
            body: {userStatus: newStatus}
        });

        //2. Update Local Status: This makes changes in realtime
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.userId === userId ? {...user, userStatus: newStatus}: user
            )
        );
        alert("User Status updated Successfully!")
    }catch(err){
        console.log("Update Failed", err);
        alert('Failed to update the user')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3 font-semibold text-gray-600">Name</th>
            <th className="p-3 font-semibold text-gray-600">User ID</th>
            <th className="p-3 font-semibold text-gray-600">Email</th>
            <th className="p-3 font-semibold text-gray-600">Role</th>
            <th className="p-3 font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => 
            <tr key={user.userId} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.name}</td>
              <td className="p-3 text-gray-500">{user.userId}</td>
              <td className="p-3">{user.email}</td>
              <td>
                <span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700">
                  {user.userType}
                </span>
              </td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    user.userStatus === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {user.userStatus}
                </span>
              </td>
              <td>
                <select
                    value={user.userStatus}
                    onChange={(e) => handleStatusChange(user.userId, e.target.value)}
                    className="border rounded p-1 text-sm bg-white"
                >
                    <option>PENDING</option>
                    <option>APPROVED</option>
                    <option>REJECTED</option>
                </select>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
