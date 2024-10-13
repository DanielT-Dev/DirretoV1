import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../styles/Project.css"
import Navigation2 from "./Navigation2"
import { getAllDocuments } from '../lib/appwrite';

const Project = () => {
    const { id } = useParams();

    const project_info = JSON.parse(localStorage.getItem("project"));

    const databaseId = '6704fcb7000a5b637f96';
    const collectionId = '6707fdba000415e265b0';
    const collectionId2 = '670aff8100268cccd099'
    const collectionId3 = '6705382c003c45dd9f1a'

    const [documents, setDocuments] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [tasks, setTasks] = useState([]);

    const [main, setMain] = useState({});

    useEffect(() => {
        const fetchDocuments = async () => {
          setLoading(true);
          
          const response = await getAllDocuments(databaseId, collectionId);
    
          setDocuments(response);
          
          const user = JSON.parse(localStorage.getItem("user_info"))
          const user_name = user.first_name + " " + user.last_name
          
          const filtered_response = response.filter(team => 
            team.members && team.members.some(member => member === user_name)
          );

          setFilteredDocuments(filtered_response.filter(team => team.name == project_info.team));

          const t = await getAllDocuments(databaseId, collectionId2);

          setTasks(t.filter(a => a.members.some(member => member === user_name)))

          setLoading(false);
        }
        fetchDocuments();
      }, [databaseId, collectionId]);

      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;

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
                    <p>
                        New Task
                    </p>
                    <img src="/add3.png"/>
                </div>
                {
                    tasks.map(a => {
                        return <div className="project_task" onClick={() => setMain(a)}>
                            <h4>
                                P1
                            </h4>
                            <h5>
                                0%
                            </h5>
                            <h2>
                                {a.name}
                            </h2>
                            <h3>
                                Assigned at: {a.date1}
                            </h3>
                            <h3>
                                Date: {a.date2}
                            </h3>
                        </div>
                    })
                }
                
                
            </div>
            <div className="project_main">
                {
                    main.name ?
                    <>
                <h1>
                    {main.name}
                </h1>
                <h3>
                    <img src={main.author_image}/>
                    {main.author}
                </h3>
                <p>
                    Assigned at: {main.date1} 
                </p>
                <p>
                    Date: {main.date2} 
                </p>
                <h2>
                    {main.info}
                </h2>
                <button>
                    <img src="/done2.png"/>
                    Mark as completed
                </button>
                </> :
                <>
                <h1>
                    Select a task to begin
                </h1>
                </>
                }
            </div>
            <div className="project_team">
                <h1>
                    Team {filteredDocuments[0].name}
                </h1>
                {
                    filteredDocuments[0].members.map(m => { 
                        return <div className="member">
                            <img src="/online1.png"/>
                            <p>
                                {m}
                            </p>
                        </div>
                        }
                    )
                }
                
            </div>
        </div>
    )
}

export default Project