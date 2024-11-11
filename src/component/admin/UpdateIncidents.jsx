import React, { useEffect, useState } from "react";
import IncidentService from "../service/IncidentService";
import UserService from "../service/UserService";
import { useNavigate, useParams } from "react-router-dom";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
    systemUsers: [], // Initialize with an empty array for system users
  });

  const [usersList, setUsersList] = useState([]);
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
          systemUsers: data.systemUsers?.map((user) => ({ id: user.id })) || [],
        });
      } catch (error) {
        console.error("Error fetching incident data:", error);
        alert("An error occurred while fetching the incident data");
      }
    };

    fetchIncidentData();
  }, [incidentId]);

  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await UserService.getAllUsers(token);
        setUsersList(response.systemUsersList); // Populate the users list
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSystemUsersChange = (index, e) => {
    const updatedSystemUsers = [...formData.systemUsers];
    updatedSystemUsers[index] = { id: e.target.value }; // Set the id as an object
    setFormData({ ...formData, systemUsers: updatedSystemUsers });
  };

  const addSystemUser = () => {
    setFormData({
      ...formData,
      systemUsers: [...formData.systemUsers, { id: "" }],
    });
  };

  const removeSystemUser = (index) => {
    const updatedSystemUsers = formData.systemUsers.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, systemUsers: updatedSystemUsers });
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
          {/* Caller Name */}
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Caller Name
            </label>
            <input
              type="text"
              name="callerName"
              value={formData.callerName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Call Time */}
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Call Time
            </label>
            <input
              type="date"
              name="callTime"
              value={formData.callTime}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Caller Contact Info */}
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Caller Contact Info
            </label>
            <input
              type="text"
              name="callerContactInfo"
              value={formData.callerContactInfo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Incident Nature */}
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Incident Nature
            </label>
            <input
              type="text"
              name="incidentNature"
              value={formData.incidentNature}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Equipment or Persons Involved */}
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Equipment or Persons Involved
            </label>
            <input
              type="text"
              name="equipmentOrPersonsInvolved"
              value={formData.equipmentOrPersonsInvolved}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location of Involved */}
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Location of Involved
            </label>
            <input
              type="text"
              name="locationOfInvolved"
              value={formData.locationOfInvolved}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Incident Detection */}
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Incident Detection
            </label>
            <input
              type="text"
              name="incidentDetection"
              value={formData.incidentDetection}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* System Users Involved */}
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              System Users Involved:
            </label>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {formData.systemUsers.map((user, index) => (
                  <div
                    key={index}
                    className="w-1/4 flex items-center space-x-2 mb-4"
                  >
                    <select
                      value={user.id}
                      onChange={(e) => handleSystemUsersChange(index, e)}
                      className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select User</option>
                      {usersList.map((usersListItem) => (
                        <option key={usersListItem.id} value={usersListItem.id}>
                          {usersListItem.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeSystemUser(index)}
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      <PersonRemoveIcon />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addSystemUser}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              >
                <PersonAddIcon />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-red-900 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={submitting}
          >
            {submitting ? "Updating..." : "Update Incident"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateIncidentPage;
