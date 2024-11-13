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
    async getIncidents(token, page = 0, size = 10, searchTerm = '') {
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
                    size: size,
                    searchTerm: searchTerm  // Include the search term here
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching incidents:", error.response ? error.response.data : error.message);
            throw new Error("Failed to load incidents. Please try again.");
        }
    }

    async getUserIncidents(token, page = 0, size = 10, searchTerm = '') {
        if (!token) {
            throw new Error("Token is required to fetch incidents.");
        }
        try {
            const response = await axios.get(`${IncidentService.BASE_URL}/user/my-incidents`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    page: page,
                    size: size,
                    searchTerm: searchTerm  // Include the search term here
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching incidents:", error.response ? error.response.data : error.message);
            throw new Error("Failed to load incidents. Please try again.");
        }
    }
    
    

    // Additional methods for updating and deleting incidents can still require security or not based on your requirements
    async updateIncident(incidentId, incidentData, token) {
        if (!token) {
            throw new Error("Token is required to fetch incidents.");
        }
        try {
            const response = await axios.put(`${IncidentService.BASE_URL}/admin/update-incident/${incidentId}`, incidentData, {
                headers: {
                   'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating incident:', error);
            throw error;
        }
    }

    async getIncidentById(token, incidentId) {
        // Check if the token is provided
        if (!token) {
            throw new Error("Token is required to fetch incidents.");
        }
        // Check if the incidentId is provided
        if (!incidentId) {
            throw new Error("Incident ID is required to fetch the incident.");
        }
        
        try {
            // Make the GET request to fetch the incident by ID
            const response = await axios.get(`${IncidentService.BASE_URL}/admin/get-incident/${incidentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Set the authorization header with the token
                },
            });
            
            return response.data; // Return the incident data
        } catch (error) {
            // Log and throw a custom error if the request fails
            console.error("Error fetching incidents:", error.response ? error.response.data : error.message);
            throw new Error("Failed to load incident. Please try again.");
        }
    }

    // async getIncidentById(incidentId) {
    //     // Check if the token is provided
    //     // if (!token) {
    //     //     throw new Error("Token is required to fetch incidents.");
    //     // }
    //     // Check if the incidentId is provided
    //     if (!incidentId) {
    //         throw new Error("Incident ID is required to fetch the incident.");
    //     }
        
    //     try {
    //         // Make the GET request to fetch the incident by ID
    //         const response = await axios.get(`${IncidentService.BASE_URL}/public/get-incident/${incidentId}`);
            
    //         return response.data; // Return the incident data
    //     } catch (error) {
    //         // Log and throw a custom error if the request fails
    //         console.error("Error fetching incidents:", error.response ? error.response.data : error.message);
    //         throw new Error("Failed to load incident. Please try again.");
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
