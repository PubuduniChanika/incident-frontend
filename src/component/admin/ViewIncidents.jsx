import React, { useState, useEffect, useMemo } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import IncidentService from '../service/IncidentService';
import { Link } from 'react-router-dom';

function ViewIncidentsPage() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await IncidentService.getIncidents(token, page, size, searchTerm); // Pass search term
                
                setIncidents(response.content);
                setTotalPages(response.totalPages);
            } catch (err) {
                setError('Failed to fetch incidents');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, [page, size, searchTerm]); // Add searchTerm to dependencies

    const columnHelper = createColumnHelper();

    const columns = useMemo(() => [
        columnHelper.accessor('callerName', { header: 'Name of Caller' }),
        columnHelper.accessor('callTime', {
            header: 'Date of Call',
            cell: info => new Date(info.getValue()).toLocaleDateString(),
        }),       
        columnHelper.accessor('callerContactInfo', { header: 'Contact Info' }),
        columnHelper.accessor('incidentNature', { header: 'Nature of Incident' }),
        columnHelper.accessor('equipmentOrPersonsInvolved', { header: 'Equipment Involved' }),
        columnHelper.accessor('locationOfInvolved', { header: 'Location' }),
        columnHelper.accessor('incidentDetection', { header: 'Detection Method' }),
    ], []);

    const table = useReactTable({
        data: incidents,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handlePreviousPage = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update search term
        setPage(0); // Reset to the first page on search
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading incidents...</div>;
    }

    if (error) {
        return <div className="text-red-600 text-center mt-4">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Incident Reports</h2>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search incidents..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded-md p-2 w-full sm:w-1/4" // Adjust width for small screens
                />
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white rounded-lg border border-gray-200">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="bg-gray-100 text-gray-600">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="py-4 px-2 sm:px-6 text-left text-sm font-medium uppercase tracking-wider">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="text-gray-700">
                        {incidents.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-8 text-gray-500">No incidents found.</td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="border-b last:border-none hover:bg-gray-50">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="py-4 px-2 sm:px-6 text-sm">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-200 text-gray-600 font-semibold rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-600 font-medium">Page {page + 1} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages - 1}
                    className="px-4 py-2 bg-gray-200 text-gray-600 font-semibold rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <Link to="/incidents/add" className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none">
                Add Incident
            </Link>
        </div>
    );
}

export default ViewIncidentsPage;
