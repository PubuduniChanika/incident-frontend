// components/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getAllUsers(token);
      setUsers(response.systemUsersList); // Assuming the list of users is under the key 'systemUsersList'
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        // After deleting the user, fetch the updated list of users
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users Management Page</h2>
      <Link to="/register">
        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200">
          Add User
        </button>
      </Link>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-600 font-medium">ID</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-600 font-medium">Name</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-600 font-medium">Email</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id} className="border-b border-gray-300 hover:bg-gray-50 transition duration-200">
                  <td className="py-3 px-4 text-gray-700">{user.id}</td>
                  <td className="py-3 px-4 text-gray-700">{user.name}</td>
                  <td className="py-3 px-4 text-gray-700">{user.email}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button 
                      className="bg-red-600 text-white font-semibold py-1 px-2 rounded-lg hover:bg-red-700 transition duration-200" 
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/update-user/${user.id}`}>
                      <button className="bg-yellow-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-yellow-600 transition duration-200">
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagementPage;
