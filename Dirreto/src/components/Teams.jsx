import React, {useEffect, useState} from 'react'
import Navigation2 from './Navigation2'

import "../styles/Teams.css"

import NewTeamModal from "../small_components/NewTeamModal"
import { getAllDocuments } from '../lib/appwrite'

import Notification from "../small_components/Notification"

const Teams = () => {
    const databaseId = '6704fcb7000a5b637f96';
    const collectionId = '6707fdba000415e265b0';

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = (success) => {
      if(success)
        showNotification("Team created successfully.");
  
      setModalOpen(false);
    };

    const [documents, setDocuments] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);
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
    <div className='teams_container'>
        <Navigation2/>
        <div className="teams_list">
            <div 
                className="team"
                onClick={openModal}
            >
                <img src="/add3.png"/>
                <h1 style={{marginTop: "6vh", color: "rgb(210, 210, 230)"}}>
                    Create a new team
                </h1>
            </div>
            {
                filteredDocuments.map((doc) => (
                    <div className="team">
                <img src={doc.image}/>
                <h1>
                    Team {doc.name}
                </h1>
                <div className="team_special">
                    <div className="team_info">
                        <p>
                            Leader: {doc.leader}
                        </p>
                        <p>
                            Memebers: {doc.members.length}
                        </p>
                    </div>
                    <div className="team_info">
                        <p>
                            Created at: {doc.start}
                        </p>
                        <p>
                            Projects: {doc.projects.length}
                        </p>
                    </div>
                </div>
                
            </div>
            ))
        }
            
        </div>
        <NewTeamModal isOpen={isModalOpen} onRequestClose={closeModal}/>
    </div>
  )
}

export default Teams