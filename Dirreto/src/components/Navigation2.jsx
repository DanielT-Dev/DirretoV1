import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import Notifications from "./Notifications"
import SearchBar from '../small_components/SearchBar'

const Navigation2 = () => {

  const navigate = useNavigate()

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const user_info = JSON.parse(localStorage.getItem("user_info"));
  const user_name = user_info.first_name

  return (
    <div className="navigation_container">
      <h1 onClick={() => navigate('/')}>
        Dirreto
      </h1>
      <p onClick={() => navigate('/overview')}>
        Overview
      </p>
      <p onClick={() => navigate('/projects')}>
        Projects
      </p>
      <p onClick={() => navigate('/teams')}>
        Teams
      </p>
      <p>
        Calendar
      </p>

      <SearchBar/>
      <p onClick={openModal}>
        <img src="/bell1.png"/>
        Notifications
      </p>
      <p onClick={() => navigate('/account')}>
        <img src="/user1.png"/>
        {user_name}
      </p>
      <Notifications modalIsOpen={modalIsOpen} closeModal={closeModal}/>
    </div>
  )
}

export default Navigation2