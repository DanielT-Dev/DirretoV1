import React from 'react'

import { useNavigate } from 'react-router-dom'

const Navigation2 = () => {

  const navigate = useNavigate()

  return (
    <div className="navigation_container">
      <h1 onClick={() => navigate('/')}>
        Dirreto
      </h1>
      <p>
        Overview
      </p>
      <p onClick={() => navigate('/projects')}>
        Projects
      </p>
      <p>
        Teams
      </p>
      <p>
        Calendar
      </p>

      <p style={{marginLeft: "40vw"}}>
        <img src="/bell1.png"/>
        Notifications
      </p>
      <p onClick={() => navigate('/account')}>
        <img src="/user1.png"/>
        Daniel Trusca
      </p>
    </div>
  )
}

export default Navigation2