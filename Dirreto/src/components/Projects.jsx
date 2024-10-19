import React, { useEffect, useState } from 'react'
import { getAllDocuments } from '../lib/appwrite';

import NewProjectModal from "../small_components/NewProjectModal"

import Notification from "../small_components/Notification"

import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate()

  const databaseId = '6704fcb7000a5b637f96';
  const collectionId = '6705393f00287ff14560';
  const teamsId = "6707fdba000415e265b0";

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

      const user_info = JSON.parse(localStorage.getItem("user_info"));
      const user_name = user_info.first_name + " " + user_info.last_name

      console.log(user_name)

      const teams = await getAllDocuments(databaseId, teamsId)
      const filtered_teams = teams.filter(t => t.members.some(m => m == user_name))

      console.log(filtered_teams)

      setDocuments(response)
      setFilteredDocuments(response.filter(p => filtered_teams.some(t => t.name == p.team)))
      setLoading(false);
    }
    fetchDocuments();
  }, [databaseId, collectionId]); // Dependencies for useEffect

  const setProject = (p) => {
    localStorage.setItem("project", JSON.stringify(p))
  }

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
                style={{width: "30%", marginLeft: "30%", marginTop: "15%", borderRadius: "0", left: "0%"}}
              />
            </div>

            {filteredDocuments.map((doc) => (
              <div 
                className="project"
                key={doc.$id}
                onClick={() => {setProject(doc); navigate('/project/123')}}
              >
                <div style={{display: "flex", flexDirection: "row"}}>
                  <img src={doc.image}/>
                  <div style={{display: "flex", flexDirection: "column", width: "100%", height: "10vh"}}>
                    <h1>
                      {doc.name}
                    </h1>
                    <p>
                      ({doc.team})
                    </p>
                  </div>
                </div>
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