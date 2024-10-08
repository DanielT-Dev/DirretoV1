import React, { useState } from 'react';
import Modal from 'react-modal';
import './NewProjectModal.css'; // Import the CSS file
import { createNewDocument } from '../lib/appwrite';

// Sample teams data
const teams = [
  { id: 1, name: 'Team Alpha' },
  { id: 2, name: 'Team Beta' },
  { id: 3, name: 'Team Gamma' },
];

// Set up the modal element for accessibility
Modal.setAppElement('#root');

const NewProjectModal = ({ isOpen, onRequestClose }) => {

  const databaseId = '6704fcb7000a5b637f96';
  const collectionId = '6705393f00287ff14560';

  const [projectName, setProjectName] = useState('');
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTeam, setSelectedTeam] = useState('');

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    await createNewDocument(
      databaseId, 
      collectionId,
      {
        name: projectName,
        team: selectedTeam,
        image: selectedImage,
        start_date: formattedDate,
        tasks: 0,
        progress: 0,
      }
    );
    onRequestClose(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose(false)}
      contentLabel="Create New Project"
      className="modal"  // Add modal class for custom styles
      overlayClassName="overlay" // Add overlay class for custom styles
    >
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            placeholder='Project Name'
          />
        </div>

        <div>
          <input
            type="text"
            id="selectedImage"
            value={selectedImage}
            onChange={(e) => setSelectedImage(e.target.value)}
            required
            placeholder='Insert Image URL'
          />
        </div>

        <div>
          <select
            id="teamDropdown"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            required
          >
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Project</button>
      </form>
    </Modal>
  );
};

export default NewProjectModal;
