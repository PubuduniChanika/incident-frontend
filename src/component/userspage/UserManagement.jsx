import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: 'Id',
      enableColumnFilter: false,
      enableSorting: false,
      cell: () => null, // This will hide the cell content
    }),
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link to={`/update-user/${row.original.id}`}>
            <IconButton 
              color="primary" 
              aria-label="update" // Accessibility label
            >
              <EditIcon /> {/* Material-UI edit icon */}
            </IconButton>
          </Link>
          <IconButton 
            color="error" 
            onClick={() => deleteUser(row.original.id)}
            aria-label="delete" // Accessibility label
          >
            <DeleteIcon /> {/* Material-UI delete icon */}
          </IconButton>
        </div>
      ),
    }),
  ], []);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getAllUsers(token);
      setUsers(response.systemUsersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      const token = localStorage.getItem('token');
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Users Management Page</h2>
      <div className="flex justify-end mb-4">
        <Link to="/register">
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200">
            Add User
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg mt-4 bg-white p-4"> {/* Removed fixed width for responsiveness */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-gray-100 text-gray-600">
                {headerGroup.headers.map(header => {
                  if (header.id !== 'id') {
                    return (
                      <th key={header.id} className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    );
                  }
                  return null;
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-gray-300 hover:bg-gray-50 transition duration-200">
                  {row.getVisibleCells().map(cell => {
                    if (cell.column.id !== 'id') {
                      return (
                        <td key={cell.id} className="py-3 px-4 text-gray-700">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      );
                    }
                    return null;
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagementPage;
