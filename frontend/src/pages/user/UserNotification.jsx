import React, { useState, useEffect } from 'react';
import cleanWasteAPI from '../../api/cleanWasteAPI'; // Ensure the API setup is correct

const UserNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch user notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await cleanWasteAPI.get('/users/profile'); // Assuming the user's notifications are part of the profile data
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Notifications</h1>
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

export default UserNotification;
