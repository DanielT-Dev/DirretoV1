import React, {useState} from 'react'
import Navigation2 from './Navigation2'

import "../styles/Teams.css"

import NewTeamModal from "../small_components/NewTeamModal"

const Teams = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = (success) => {
      if(success)
        showNotification("Project created successfully.");
  
      setModalOpen(false);
    };

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
            <div className="team">
                <img src="https://imagedelivery.net/maTmUOtE_OG9P8IykvHTIA/6f03da3c-c675-4cee-8586-750c0f346200/public"/>
                <h1>
                    Team HEARTSTEEL
                </h1>
                <div className="team_special">
                    <div className="team_info">
                        <p>
                            Leader: Ezreal
                        </p>
                        <p>
                            Memebers: 6
                        </p>
                    </div>
                    <div className="team_info">
                        <p>
                            Created at: Octomber 10, 2024
                        </p>
                        <p>
                            Projects: 1
                        </p>
                    </div>
                </div>
                
            </div>
            <div className="team">
                <h1>
                    Team Beta
                </h1>
            </div>
            <div className="team">
                <h1>
                    Team Gamma
                </h1>
            </div>
        </div>
        <NewTeamModal isOpen={isModalOpen} onRequestClose={closeModal}/>
    </div>
  )
}

export default Teams