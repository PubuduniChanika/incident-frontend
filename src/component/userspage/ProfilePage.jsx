import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.systemUsers);
            console.log(response);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Profile Information</h2>
                
                <div className="space-y-4">
                    <p className="text-gray-700">
                        <span className="font-medium">Name:</span> {profileInfo.name}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Email:</span> {profileInfo.email}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Designation:</span> {profileInfo.designation}
                    </p>
                </div>

                {profileInfo.role === "ISO" && (
                    <div className="mt-8 text-center">
                        <Link 
                            to={`/update-user/${profileInfo.id}`} 
                            className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Update This Profile
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
