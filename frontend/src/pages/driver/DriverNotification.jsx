import React, { useState, useEffect } from 'react';
import cleanWasteAPI from '../../api/cleanWasteAPI'; // Assuming the API setup is correct
import DriverNavbar from '../../components/DriverNavbar'; // Import Navbar component
import Footer from '../../components/Footer'; // Import Footer component

const DriverNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch driver notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await cleanWasteAPI.get('/users/profile'); // Assuming the driver's notifications are part of the profile data
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Fetch driver tasks from the backend
    const fetchTasks = async () => {
      try {
        const response = await cleanWasteAPI.get('/drivers/assigned-pickups');
        setTasks(response.data || []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchNotifications();
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DriverNavbar /> 
      
      <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-center text-[#175E5E] mb-8">Driver Dashboard</h1>

        <div className="w-full max-w-4xl">
          {/* Tasks Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#175E5E] mb-4">Assigned Tasks</h2>
            {tasks.length > 0 ? (
              <ul className="space-y-4">
                {tasks.map((task, index) => (
                  <li key={index} className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-400">
                    <p className="text-lg font-semibold text-gray-700">
                      Street: {task.assignedStreet}, Pickup Date: {new Date(task.assignmentDate).toLocaleDateString()}
                    </p>
                    <span className={`text-sm ${task.completed ? 'text-green-500' : 'text-yellow-500'}`}>
                      Status: {task.completed ? 'Completed' : 'Pending'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <p className="text-lg font-semibold text-gray-700">No tasks assigned.</p>
              </div>
            )}
          </div>

          {/* Notifications Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#175E5E] mb-4">Notifications</h2>
            {notifications.length > 0 ? (
              <ul className="space-y-4">
                {notifications.map((notification, index) => (
                  <li key={index} className="bg-white shadow-md rounded-lg p-6 border-l-4 border-yellow-400">
                    <p className="text-lg font-semibold text-gray-700">{notification.message}</p>
                    <span className="text-sm text-gray-500">
                      {new Date(notification.date).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <p className="text-lg font-semibold text-gray-700">No notifications available.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer /> {/* Add Footer at the bottom */}
    </div>
  );
};

export default DriverNotification;
