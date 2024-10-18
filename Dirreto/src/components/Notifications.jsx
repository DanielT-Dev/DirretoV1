import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // Optional: if using react-modal

import "../styles/Notifications.css"

import { formatDistanceToNow } from 'date-fns'; // Optional: For better date handling

import { getAllDocuments } from '../lib/appwrite';

import { useNavigate } from 'react-router-dom'

import { client } from '../lib/appwrite';

Modal.setAppElement('#root'); // Required for accessibility if using react-modal


const Notifications = ({modalIsOpen, closeModal}) => {

  const navigate = useNavigate();
  
  const databaseId = "6704fcb7000a5b637f96"
  const collectionId = "670c26ba0029b0593bd4"

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNotifcations = async () => {
      setLoading(true);
  
      const response = await getAllDocuments(databaseId, collectionId);
  
      const user_info = JSON.parse(localStorage.getItem("user_info"));
  
      const user_name = user_info.first_name + " " + user_info.last_name;
  
      console.log(user_name);
  
      setNotifications(
        response
          .filter((n) =>
            n.members.some((m) => m.trim() === user_name.trim())
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      );
  
      setLoading(false);
    };
  
    getNotifcations();
  
    // Start real-time subscription
    const unsubscribe = client.subscribe(
      `databases.${databaseId}.collections.${collectionId}.documents`,
      (response) => {
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          const newNotification = response.payload;
          
          // Check if the new notification is relevant to the user
          if (newNotification.members.some(m => m.trim() === user_name.trim())) {
            setNotifications(prevNotifications => 
              [newNotification, ...prevNotifications].sort((a, b) => new Date(b.date) - new Date(a.date))
            );
          }
        }
      }
    );
  
    // Cleanup function to unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  

  const timeAgo = (isoString) => {
    const date = new Date(isoString); // Convert ISO string to Date object
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const go = async (role, message, image, team, project) => {
    if(role == "invite")
    {
      localStorage.setItem("current_invite_info", JSON.stringify({
        message,
        image,
        team,
        project
      }))
      navigate('/invite');
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        contentLabel="Notifications Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h1>Notifications</h1>
        <button onClick={closeModal} className="dismiss">Dismiss</button>
        <button onClick={closeModal} className="close-modal-btn">Close</button>
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li key={notification.id} onClick={() => go(notification.role, notification.message, notification.image, notification.team, notification.project)}>
                <img src={notification.image ? notification.image : "/user_placeholder1.jpg"}/>
                <div style={{display: "flex", flexDirection: "column"}}>
                  <h2>
                  {notification.message}
                  </h2>
                  <p>
                  {timeAgo(notification.date)}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p>No new notifications</p>
          )}
        </ul>
      </Modal>
    </div>
  );
};

export default Notifications;
