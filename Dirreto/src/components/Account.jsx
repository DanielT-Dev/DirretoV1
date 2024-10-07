import React from 'react'
import Navigation2 from './Navigation2'

import "../styles/Account.css"

const Account = () => {
  return (
    <div className="account_container">
      <Navigation2/>

      <div className="account_user">
        <img src="/user_placeholder1.jpg"/>
        <h1>
          Marian-Daniel Trușcă
        </h1>
      </div>

      <div className="account_links">
        <h1>
          <img src="/settings1.png"/>
          Account Settings
        </h1>
        <p>
          Edit Profile
        </p>
        <p>
          Password
        </p>
        <p>
          Auth
        </p>
        <p>
          Appeareance
        </p>
      </div>

      <div className="account_main">
        <h2>
          Edit Profile
        </h2>
        <input 
          type="text"
          placeholder="First Name"
        />
        <br/>
        <input 
          type="text"
          placeholder="Last Name"
        />
        <br/>
        <textarea placeholder="Your Info">
        </textarea>
        <br/>
        <button>
          Save
        </button>
        <h2>
          Password
        </h2>
        <h2>
          Auth
        </h2>
        <h2>
          Appeareance
        </h2>
      </div>
    </div>
  )
}

export default Account