import React, { useState } from 'react';
import Modal from 'react-modal';
import './NewTeamModal.css'; // Import the CSS file
import { createNewDocument } from '../lib/appwrite'; // Make sure this function is set up for team creation

// Set up the modal element for accessibility
Modal.setAppElement('#root');

const NewTeamModal = ({ isOpen, onRequestClose }) => {
  const databaseId = '6704fcb7000a5b637f96'; // Adjust your database ID as needed
  const collectionId = '6707fdba000415e265b0'; // Adjust your collection ID as needed

  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [teamImage, setTeamImage] = useState(""); // State for team image

  const handleImageChange = (event) => {
    setTeamImage(event.target.files[0]); // Set the selected image
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert the teamMembers string into an array
    const membersArray = teamMembers.split(',').map(member => member.trim());

    // Prepare data to send to the database
    const teamData = {
      name: teamName,
      description: teamDescription,
      members: membersArray,
      image: teamImage ? URL.createObjectURL(teamImage) : null, // Use URL.createObjectURL for local image preview
    };

    await createNewDocument(databaseId, collectionId, teamData);
    onRequestClose(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose(false)}
      contentLabel="Create New Team"
      className="modal"  // Add modal class for custom styles
      overlayClassName="overlay" // Add overlay class for custom styles
    >
      <h2>Create New Team</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            placeholder='Team Name'
          />
        </div>

        <div>
          <input
            type="text"
            id="teamImage"
            onChange={(e) => setTeamImage(e.target.value)}
            required
            placeholder='Team Image URL'
          />
        </div>

        <div>
          <textarea
            id="teamDescription"
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            required
            placeholder='Team Description'
          />
        </div>

        <div>
          <input
            type="text"
            id="teamMembers"
            value={teamMembers}
            onChange={(e) => setTeamMembers(e.target.value)}
            required
            placeholder='Team Members (comma separated)'
          />
        </div>

        <button type="submit">Create Team</button>
      </form>
    </Modal>
  );
};

export default NewTeamModal;