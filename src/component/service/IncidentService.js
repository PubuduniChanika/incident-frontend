import axios from 'axios';



class IncidentService {
    static BASE_URL = "http://localhost:8080"
    // Method to add a new incident report
    async addIncident(incidentData) {
        try {
            const response = await axios.post(`${IncidentService.BASE_URL}/public/add-incident`, incidentData);
            return response.data;
        } catch (error) {
            throw new Error("Error Adding Incident");
        }
    }

    // Method to fetch incidents 
    async getIncidents(token, page = 0, size = 10) {
        if (!token) {
            throw new Error("Token is required to fetch incidents.");
        }
        try {
            const response = await axios.get(`${IncidentService.BASE_URL}/admin/get-incidents`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    page: page,
                    size: size
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching incidents:", error.response ? error.response.data : error.message);
            throw new Error("Failed to load incidents. Please try again.");
        }
    }
    

    // // Additional methods for updating and deleting incidents can still require security or not based on your requirements
    // async updateIncident(incidentId, incidentData) {
    //     try {
    //         const response = await axios.put(`${API_URL}/${incidentId}`, incidentData, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error updating incident:', error);
    //         throw error;
    //     }
    // }

    // async deleteIncident(incidentId) {
    //     try {
    //         const response = await axios.delete(`${API_URL}/${incidentId}`);
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error deleting incident:', error);
    //         throw error;
    //     }
    // }
}

export default new IncidentService();
