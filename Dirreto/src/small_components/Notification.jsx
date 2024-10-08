import React, { useState, useEffect } from 'react';
import './Notification.css'; // optional, for styling

const Notification = ({ message, type = 'info', duration = 3000, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div className={`notification ${type}`}>
            <span>{message}</span>
        </div>
    );
};

export default Notification;
