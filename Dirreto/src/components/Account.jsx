import React from 'react'
import Navigation2 from './Navigation2'

import "../styles/Account.css"
import Switch from '../small_components/Switch'

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
        <p>
          <img src="/info2.png"/>
          Your profile changes will be saved immediatly.
        </p>
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
        <p>
          <img src="/info2.png"/>
          Changing your password will log you out from all devices.
        </p>
        <input 
          type="password"
          placeholder='Old Password'
        />
        <br/>
        <input 
          type="password"
          placeholder='New Password'
        />
        <button>
          Confirm
        </button>
        <h2>
          Auth
        </h2>
        <div style={{display: "flex", flexDirection: 'row'}}>
          <Switch/>
          <h3>
            Enable Multi-Factor Authentication
          </h3>
          <p>
          <img src="/info2.png"/>
          You will recieve a 6 digit code on your email every time you try to log-in.
          </p>
        </div>
        
        <h2>
          Appeareance
        </h2>
      </div>
    </div>
  )
}

export default Account