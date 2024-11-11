// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/common/NavBar";
import LoginPage from "./component/auth/LoginPage";
import RegistrationPage from "./component/auth/RegistrationForm";
import IncidentPage from "./component/public/AddIncident";
import ProfilePage from "./component/userspage/ProfilePage";
import ViewIncidentsPage from "./component/admin/ViewIncidents";
import UserService from './component/service/UserService';
import UserManagementPage from "./component/userspage/UserManagement";
import UpdateIncidentPage from "./component/admin/UpdateIncidents"
import UpdateUser from "./component/userspage/UpdateUser";
import FooterComponent from "./component/common/Footer";
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<IncidentPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/public/add-incident" element={<IncidentPage />} />
            
            

            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UserService.adminOnly() ? (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/update-incident/:incidentId" element={<UpdateIncidentPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin/get-incidents" element={<ViewIncidentsPage />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
