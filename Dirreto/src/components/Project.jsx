import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../styles/Project.css"
import Navigation2 from "./Navigation2"
import { createNewDocument, getAllDocuments, updateDocument } from '../lib/appwrite';
import NewTaskModal from '../small_components/NewTaskModal';

import Notification from '../small_components/Notification';

const Project = () => {
    const { id } = useParams();

    const [show, setShow] = useState(false)

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
        showNotification("Task created successfully.");
  
      setModalOpen(false);
    };

    const project_info = JSON.parse(localStorage.getItem("project"));

    const databaseId = '6704fcb7000a5b637f96';
    const collectionId = '6707fdba000415e265b0';
    const collectionId2 = '670aff8100268cccd099'
    const collectionId3 = '6705382c003c45dd9f1a'
    const notificationsId = "670c26ba0029b0593bd4"; 

    const [documents, setDocuments] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [tasks, setTasks] = useState([]);

    const [main, setMain] = useState({});

    const [newMember, setNewMember] = useState("");

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

          setTasks(t.filter(a => a.members.some(member => member === user_name) && a.project == project_info.name))

          setLoading(false);
        }
        fetchDocuments();
      }, [databaseId, collectionId]);

      const user = JSON.parse(localStorage.getItem("user_info"))
      const user_name = user.first_name + " " + user.last_name

      const handleComplete = async () => {
        showNotification("Task marked as completed.")

        const project = JSON.parse(localStorage.getItem("project"))

        const currentDate = new Date();

        await createNewDocument(databaseId, notificationsId, 
            {
                members: [main.author],
                date: currentDate,
                message: "Task completed at " + project.name +  " by " + user_name,
                image: user.image,
                role: "info",
                team: project.team,
                project: project.name,
            }
        )

        const { $id, $collectionId, $databaseId, completed, ...document_data } = main;

        await updateDocument(databaseId, collectionId2, main.$id, {
            ...document_data,
            completed: [...completed, user_name]
        })
      } 

      const handleInvite = async () => {
        const project = JSON.parse(localStorage.getItem("project"))

        const currentDate = new Date();

        await createNewDocument(databaseId, notificationsId, 
            {
                members: [newMember],
                date: currentDate,
                message: user_name + " invited you to join " + project.name,
                image: project.image,
                role: "invite",
                team: project.team,
                project: project.name,
            }
        )

        showNotification("Invite sent to " + newMember)
        
        setShow(false);
      }

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
                <div 
                    className="project_task"
                    onClick={openModal}
                >
                    <p>
                        New Task
                    </p>
                    <img src="/add3.png"/>
                </div>
                {
                    tasks.map(a => {
                        return <div className="project_task" onClick={() => setMain(a)}>
                            {
                                    !a.completed.some(m => m == user_name) && `completed` &&
                                    <>
                                    <h4>
                                        P1
                                    </h4>
                                    <h5>
                                        0%
                                    </h5>
                                    </>       
                            }
                            <h2>
                                {a.name}

                                {
                                    a.completed.some(m => m == user_name) && `completed` &&
                                    <h6>
                                        Completed
                                    </h6>
                                }
                                
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
                <button onClick={handleComplete} className={main.completed.some(m => m == user_name) && `completed`}>
                    <img src="/done2.png"/>
                    {
                        !main.completed.some(m => m == user_name) ?
                        <>
                        Mark as completed
                        </>:
                        <>
                        Completed
                        </>
                    }
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
                <div className="member" onClick={() => setShow(p => !p)}>
                    <img src="/add4.png"/>
                    <p className="member_special">
                        Invite members
                    </p>
                </div>
                {
                    show &&
                    <>
                        <input 
                            type="text"
                            placeholder='Full Name'
                            value={newMember}
                            onChange={(e) => setNewMember(e.target.value)}
                        />
                        <button onClick={handleInvite}>
                            Invite
                        </button>
                    </>
                }
                {
                    filteredDocuments[0].members.map(m => { 
                        return <div className="member">
                            <p>
                                {m}
                            </p>
                        </div>
                        }
                    )
                }
                
            </div>
            <NewTaskModal isOpen={isModalOpen} onRequestClose={closeModal}/>
            <Notification
                message={notification.message}
                type={notification.type}
                duration={3000} // optional, default is 3000ms
                onClose={closeNotification}
            />
        </div>
    )
}

export default Project