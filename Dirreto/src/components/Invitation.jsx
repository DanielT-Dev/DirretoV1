import React, { useState } from 'react';
import '../styles/Invitation.css';
import { createNewDocument, getAllDocuments, updateDocument } from '../lib/appwrite';
import { useNavigate } from "react-router-dom"

const Invitation = () => {
  const navigate = useNavigate()

  const databaseId = '6704fcb7000a5b637f96';
  const collectionId = '6707fdba000415e265b0';
  const notificationsId = "670c26ba0029b0593bd4"; 

  const current_invite_info = JSON.parse(localStorage.getItem("current_invite_info"))

  const [response, setResponse] = useState(null);

  const handleAccept = async () => {
    setResponse('Accepted');

    const teams = await getAllDocuments(databaseId, collectionId)
    const t = teams.filter(o => o.name == current_invite_info.team)[0]

    const { $id, $collectionId, $databaseId, completed, ...document_data } = t;

    const user = JSON.parse(localStorage.getItem("user_info"))
    const user_name = user.first_name + " " + user.last_name

    const new_members = [...document_data.members, user_name]

    await updateDocument(
      databaseId,
      collectionId,
      $id,
      {
        ...document_data,
        members: new_members,
      }
    )

    const currentDate = new Date();

    await createNewDocument(databaseId, notificationsId, 
      {
          members: [document_data.leader],
          date: currentDate,
          message: user_name + " has accepted your invite for " + current_invite_info.project,
          image: user.image,
          role: "info",
          team: current_invite_info.team,
          project: current_invite_info.project,
      }
  )

    navigate("/projects")
  };

  const handleDecline = () => {
    setResponse('Declined');
  };

  

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
