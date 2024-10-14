import React, { useState } from 'react';
import '../styles/Invitation.css';

const Invitation = () => {
  const [response, setResponse] = useState(null);

  const handleAccept = () => {
    setResponse('Accepted');
  };

  const handleDecline = () => {
    setResponse('Declined');
  };

  const current_invite_info = JSON.parse(localStorage.getItem("current_invite_info"))

  return (
    <div className="invitation_container">
      <div className="invitation_card">
        <img src={current_invite_info.image}/>
        <h1>{current_invite_info.message}</h1>
        <div className="button_container">
          <button className="accept_button" onClick={handleAccept}>
            Accept
          </button>
          <button className="decline_button" onClick={handleDecline}>
            Decline
          </button>
        </div>
        {response && <p>You have {response} the invitation.</p>}
      </div>
    </div>
  );
};

export default Invitation;
