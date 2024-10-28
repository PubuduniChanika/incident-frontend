import React, { useState } from 'react';
import IncidentService from '../service/IncidentService';
import { useNavigate } from 'react-router-dom';

function AddIncidentPage() {
    const navigate = useNavigate();

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toISOString().slice(0, 16); // Formats as "YYYY-MM-DDTHH:MM"
    };

    const [formData, setFormData] = useState({
        callerName: '',
        callTime: getCurrentDateTime(), 
        callerContactInfo: '',
        incidentNature: '',
        equipmentOrPersonsInvolved: '',
        locationOfInvolved: '',
        incidentDetection: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await IncidentService.addIncident(formData, token);

            setFormData({
                callerName: '',
                callTime: '',
                callerContactInfo: '',
                incidentNature: '',
                equipmentOrPersonsInvolved: '',
                locationOfInvolved: '',
                incidentDetection: ''
            });

            alert('Incident reported successfully');
            navigate('/admin/user-management');
        } catch (error) {
            console.error('Error adding incident:', error);
            alert('An error occurred while reporting the incident');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10">
                <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Incident Report</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium mb-2">Name of the caller:</label>
                        <input 
                            type="text" 
                            name="callerName" 
                            value={formData.callerName} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium mb-2">Time of the call:</label>
                        <input 
                            type="datetime-local" 
                            name="callTime" 
                            value={formData.callTime} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium mb-2">Contact information of the caller:</label>
                        <input 
                            type="text" 
                            name="callerContactInfo" 
                            value={formData.callerContactInfo} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium mb-2">The nature of the incident:</label>
                        <input 
                            type="text" 
                            name="incidentNature" 
                            value={formData.incidentNature} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium mb-2">What equipment or person(s) were involved:</label>
                        <input 
                            type="text" 
                            name="equipmentOrPersonsInvolved" 
                            value={formData.equipmentOrPersonsInvolved} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium mb-2">Location of the equipment or person(s) involved:</label>
                        <input 
                            type="text" 
                            name="locationOfInvolved" 
                            value={formData.locationOfInvolved} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-medium mb-2">How the incident was detected:</label>
                        <input 
                            type="text" 
                            name="incidentDetection" 
                            value={formData.incidentDetection} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
            type="submit"
            className="w-full py-2 bg-red-900 text-white font-semibold rounded-md hover:bg-amber-700 transition duration-200"
          >
                        Add Incident
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddIncidentPage;
