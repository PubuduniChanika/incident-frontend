import React, { useState, useEffect, useMemo } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import IncidentService from '../service/IncidentService';
import { Link } from 'react-router-dom';

function ViewIncidentsPage() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await IncidentService.getIncidents(token);
                setIncidents(response);
            } catch (err) {
                setError('Failed to fetch incidents');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

    const columnHelper = createColumnHelper();

    const columns = useMemo(() => [
        columnHelper.accessor('callerName', { header: 'Name of Caller' }),
        columnHelper.accessor('callTime', { header: 'Time of Call', cell: info => new Date(info.getValue()).toLocaleString() }),
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

    if (loading) {
        return <div>Loading incidents...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Incident Reports</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="bg-gray-200 text-gray-700">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="py-3 px-6 font-semibold text-left">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {incidents.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-4">No incidents found.</td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="border-b hover:bg-gray-50">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="py-3 px-6">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Link to="/incidents/add" className="btn btn-primary">Add Incident</Link>
        </div>
    );
}

export default ViewIncidentsPage;
