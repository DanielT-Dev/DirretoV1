import React, { useState } from 'react';
import Modal from 'react-modal';
import './NewTeamModal.css'; // Import the CSS file
import { createNewDocument, getAllDocuments } from '../lib/appwrite'; // Make sure this function is set up for task creation

// Set up the modal element for accessibility
Modal.setAppElement('#root');

const NewTaskModal = ({ isOpen, onRequestClose }) => {
  const databaseId = '6704fcb7000a5b637f96'; // Adjust your database ID as needed
  const collectionId = '670aff8100268cccd099'; // Adjust your collection ID for tasks
  const notificationsId = "670c26ba0029b0593bd4"; 

  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignees, setAssignees] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert the assignees string into an array
    const assigneesArray = assignees.split(',').map(assignee => assignee.trim());

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const d = new Date(dueDate);
    const formattedDate2 = d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const user_info = JSON.parse(localStorage.getItem("user_info"));
    const user_name = user_info.first_name + " " + user_info.last_name;

    const size = await getAllDocuments(databaseId, collectionId);

    const taskData = {
      name: name,
      info,
      date2: formattedDate2,
      members: assigneesArray,
      date1: formattedDate,
      author: user_name,
      author_image: user_info.image,
      identifier: JSON.stringify(size.length + 1),
    };

    await createNewDocument(databaseId, collectionId, taskData);

    const project = JSON.parse(localStorage.getItem("project"))

    await createNewDocument(databaseId, notificationsId, 
      {
        members: assigneesArray,
        date: formattedDate,
        message: "You have been assigned a new task for project " + project.name +  " by " + user_name
      }
    )

    onRequestClose(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose(false)}
      contentLabel="Create New Task"
      className="modal"  // Add modal class for custom styles
      overlayClassName="overlay" // Add overlay class for custom styles
    >
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder='Task Name'
          />
        </div>

        <div>
          <textarea
            id="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            required
            placeholder='Task Description'
          />
        </div>

        <div>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="text"
            id="assignees"
            value={assignees}
            onChange={(e) => setAssignees(e.target.value)}
            required
            placeholder='Assignees (comma separated)'
          />
        </div>

        <button type="submit">Create Task</button>
      </form>
    </Modal>
  );
};

export default NewTaskModal;
