import React, { useEffect, useState } from 'react'
import { getAllDocuments } from '../lib/appwrite';

import NewProjectModal from "../small_components/NewProjectModal"

import Notification from "../small_components/Notification"

const Projects = () => {
  const databaseId = '6704fcb7000a5b637f96';
  const collectionId = '6705393f00287ff14560';

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [notification, setNotification] = useState({ message: '', type: '' });

  // Function to show a notification
  const showNotification = (message, type = 'info') => {
      setNotification({ message, type });
  };

  // Function to close the notification
  const closeNotification = () => {
      setNotification({ message: '', type: '' });
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = (success) => {
    if(success)
      showNotification("Project created successfully.");

    setModalOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  const handleSearch = () => {
    const results = documents.filter(doc =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDocuments(results); // Update filtered documents
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      
      const response = await getAllDocuments(databaseId, collectionId);

      setDocuments(response);
      setFilteredDocuments(response);
      setLoading(false);
    }
    fetchDocuments();
  }, [databaseId, collectionId]); // Dependencies for useEffect

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
        <div className="projects_container">
            <h1>
                Search Project
            </h1>
            <input 
              type="text"
              placeholder='Project Name'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button onClick={handleSearch}>
              <img src="/search1.png"/>
              Search
            </button>

            <p>
              Filter Projects By 
            </p>
            <div style={{display: "flex", flexDirection: "row"}}>
              <button class="projects_button">
                Public
              </button>
              <button class="projects_button">
                Private
              </button>
            </div>
            <div style={{display: "flex", flexDirection: "row"}}>
              <button class="projects_button">
                Newest
              </button>
              <button class="projects_button">
                Oldest
              </button>
            </div>
            <div style={{display: "flex", flexDirection: "row"}}>
              <button class="projects_button">
                Best Rating
              </button>
              <button class="projects_button">
                Most Views
              </button>
            </div>
            
        </div>
        <div className="list_container">
            <div 
              className="project special1"
              onClick={() => openModal()}
            >
              <img 
                src='/add3.png'
                style={{width: "30%", marginLeft: "30%", marginTop: "15%", borderRadius: "0"}}
              />
            </div>

            {filteredDocuments.map((doc) => (
              <div 
                className="project"
                key={doc.$id}
              >
                <img src={doc.image}/>
                <h1>
                  {doc.name}
                </h1>
                <p>
                  ({doc.team})
                </p>
                <h2>
                  Created at: {doc.start_date}
                </h2>
                <h2>
                  Assigned tasks: {doc.tasks}
                </h2>
                <h2>
                  Total progress: {doc.progress} %
                </h2>
              </div>
            ))}
           
        </div>
        <NewProjectModal isOpen={isModalOpen} onRequestClose={closeModal}/>
        <Notification
          message={notification.message}
          type={notification.type}
          duration={3000} // optional, default is 3000ms
          onClose={closeNotification}
        />
    </div>
  )
}

export default Projects