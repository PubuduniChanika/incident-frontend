import React, { useEffect, useState } from "react";
import IncidentService from "../service/IncidentService";
import { useNavigate, useParams } from "react-router-dom";

function UpdateIncidentPage() {
  const navigate = useNavigate();
  const { incidentId } = useParams(); // Get incidentId from URL parameters

  const [formData, setFormData] = useState({
    callerName: "",
    callTime: "",
    callerContactInfo: "",
    incidentNature: "",
    equipmentOrPersonsInvolved: "",
    locationOfInvolved: "",
    incidentDetection: "",
    selectedSystemUsers: []
  });

  const [systemUsers, setSystemUsers] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch incident data when component mounts
    const fetchIncidentData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await IncidentService.getIncidentById(token, incidentId);
        setFormData({
          callerName: data.callerName,
          callTime: data.callTime,
          callerContactInfo: data.callerContactInfo,
          incidentNature: data.incidentNature,
          equipmentOrPersonsInvolved: data.equipmentOrPersonsInvolved,
          locationOfInvolved: data.locationOfInvolved,
          incidentDetection: data.incidentDetection,
          systemUsers: data.systemUsers || [] // optional field for users
        });
      } catch (error) {
        console.error("Error fetching incident data:", error);
        alert("An error occurred while fetching the incident data");
      }
    };

    fetchIncidentData();
  }, [incidentId]);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Disable the button to prevent multiple submissions
    try {
      const token = localStorage.getItem("token");
      await IncidentService.updateIncident(incidentId, formData, token); // Update incident

      alert("Incident updated successfully");
      navigate("/admin/get-incidents"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating incident:", error);
      alert("An error occurred while updating the incident");
    } finally {
      setSubmitting(false); // Re-enable the button after the form submission is complete
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Update Incident Report
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Name of the caller:
            </label>
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
            <label className="block text-gray-700 font-medium mb-2">
              Time of the call:
            </label>
            <input
              type="date"
              name="callTime"
              value={formData.callTime}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Contact information of the caller:
            </label>
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
            <label className="block text-gray-700 font-medium mb-2">
              The nature of the incident:
            </label>
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
            <label className="block text-gray-700 font-medium mb-2">
              What equipment or person(s) were involved:
            </label>
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
            <label className="block text-gray-700 font-medium mb-2">
              Location of the equipment or person(s) involved:
            </label>
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
            <label className="block text-gray-700 font-medium mb-2">
              How the incident was detected:
            </label>
            <input
              type="text"
              name="incidentDetection"
              value={formData.incidentDetection}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* System Users Section */}
        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">System Users Involved:</label>
          <div className="space-y-4">
            {formData.systemUsers?.map((user, index) => (
              <div key={user.id} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                />
                {/* <span className="text-gray-600">ID: {user.id}</span> */}
              </div>
            ))}
          </div>
        </div>
          
          <button
            type="submit"
            className="w-full py-2 bg-red-900 text-white font-semibold rounded-md hover:bg-amber-700 transition duration-200"
            disabled={submitting} // Disable button when submitting
          >
            {submitting ? "Updating..." : "Update Incident"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateIncidentPage;