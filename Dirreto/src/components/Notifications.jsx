import React, { useState } from 'react';
import Modal from 'react-modal'; // Optional: if using react-modal

import "../styles/Notifications.css"

import { formatDistanceToNow } from 'date-fns'; // Optional: For better date handling


Modal.setAppElement('#root'); // Required for accessibility if using react-modal


const Notifications = ({modalIsOpen, closeModal}) => {
  // Sample notifications
  const notifications = [
    { id: 1, message: "You have a new message from John.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) }, // 3 hours ago
    { id: 2, message: "Your order has been shipped.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) }, // 1 day ago
    { id: 3, message: "Update your profile to get more recommendations.", timestamp: new Date(Date.now() - 1000 * 60 * 10) }, // 10 minutes ago
  ];

  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };


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
              <li key={notification.id}>
                <img src="/user_placeholder1.jpg"/>
                <div style={{display: "flex", flexDirection: "column"}}>
                  <h2>
                  {notification.message}
                  </h2>
                  <p>
                  {timeAgo(notification.timestamp)}
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
