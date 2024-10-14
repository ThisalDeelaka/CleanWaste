import React, { useState, useEffect } from 'react';
import cleanWasteAPI from '../../api/cleanWasteAPI'; // Assuming the API setup is correct

const DriverNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch driver notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await cleanWasteAPI.get('/users/profile'); // Assuming the driver's notifications are part of the profile data
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Fetch driver tasks from the backend
    const fetchTasks = async () => {
      try {
        const response = await cleanWasteAPI.get('/drivers/assigned-pickups');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchNotifications();
    fetchTasks();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Driver Notifications</h1>
      
      <h2 className="text-xl font-semibold">Tasks</h2>
      <ul className="list-disc pl-5 mb-6">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index} className="mb-2">
              Street: {task.assignedStreet}, Pickup Date: {new Date(task.assignmentDate).toLocaleDateString()}
              <br />
              <span className="text-sm text-gray-500">Status: {task.completed ? 'Completed' : 'Pending'}</span>
            </li>
          ))
        ) : (
          <p>No tasks assigned.</p>
        )}
      </ul>

      <h2 className="text-xl font-semibold">Notifications</h2>
      <ul className="list-disc pl-5">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index} className="mb-2">
              {notification.message} <br />
              <span className="text-sm text-gray-500">{new Date(notification.date).toLocaleDateString()}</span>
            </li>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </ul>
    </div>
  );
};

export default DriverNotification;
