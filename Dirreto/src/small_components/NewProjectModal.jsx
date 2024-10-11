import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './NewProjectModal.css'; // Import the CSS file
import { createNewDocument, getAllDocuments } from '../lib/appwrite';

// Set up the modal element for accessibility
Modal.setAppElement('#root');

const NewProjectModal = ({ isOpen, onRequestClose }) => {

  const databaseId = '6704fcb7000a5b637f96';
  const collectionId = '6705393f00287ff14560';
  const collectionId2 = '6707fdba000415e265b0';

  const [projectName, setProjectName] = useState('');
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTeam, setSelectedTeam] = useState('');

  const [teams, setTeams] = useState([]);

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

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getAllDocuments(databaseId, collectionId2);

        const user = JSON.parse(localStorage.getItem("user_info"))
        const user_name = user.first_name + " " + user.last_name
        
        const filtered_response = response.filter(team => 
          team.members && team.members.some(member => member === user_name)
        );


        setTeams(filtered_response);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
  
    fetchTeams();
  }, []);
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose(false)}
      contentLabel="Create New Project"
      className="modal1"  // Add modal class for custom styles
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
            {teams.map((team, k) => (
              <option key={k} value={team.name}>
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
