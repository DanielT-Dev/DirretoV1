import React, { useEffect, useState } from 'react'
import { getAllDocuments } from '../lib/appwrite';

import NewProjectModal from "../small_components/NewProjectModal"

const Projects = () => {
  const databaseId = '6704fcb7000a5b637f96';
  const collectionId = '6705393f00287ff14560';

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      
      const response = await getAllDocuments(databaseId, collectionId);

      setDocuments(response);
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
            />
            <button>
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
            {documents.map((doc) => (
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
              </div>
            ))}
            <div 
              className="project"
              onClick={() => openModal()}
            >
              <img 
                src='/add2.png'
                style={{width: "30%", marginLeft: "30%", marginTop: "15%", borderRadius: "0"}}
              />
            </div>
        </div>
        <NewProjectModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  )
}

export default Projects