import React from 'react'
import { useParams } from 'react-router-dom';
import "../styles/Project.css"
import Navigation2 from "./Navigation2"

const Project = () => {
    const { id } = useParams();

    const project_info = JSON.parse(localStorage.getItem("project"));

    return (
        <div className="project_container">
            <Navigation2/>
            <div className="project_info">
                <img src={project_info.image}/>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h1>
                        {project_info.name}
                    </h1>
                    <p>
                        {project_info.info}
                    </p>
                </div>
            </div>
            <div className="project_list">
                <div className="project_task">
                
                </div>
                <div className="project_task">
                
                </div>
                <div className="project_task">
                
                </div>
            </div>
            <div className="project_main">

            </div>
            <div className="project_team">

            </div>
        </div>
    )
}

export default Project