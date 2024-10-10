import React, {useState} from 'react'
import Navigation2 from './Navigation2'

import "../styles/Account.css"
import Switch from '../small_components/Switch'

import { account, getDocumentByEmail, ID, updateDocument } from '../lib/appwrite';

import { useNavigate } from 'react-router-dom';
import Notification from '../small_components/Notification';

const Account = () => {

  const databaseId = '6704fcb7000a5b637f96';
  const collectionId = '6705382c003c45dd9f1a';

  const navigate = useNavigate(); 

  async function logout() {
    try {
        await account.deleteSession('current');

        localStorage.removeItem("user");

        navigate('/log-in');
    } catch (error) {
        console.error("Error logging out:", error);
        alert("Logout failed: " + error.message);
    }
  }

  const [notification, setNotification] = useState({ message: '', type: '' });

  // Function to show a notification
  const showNotification = (message, type = 'info') => {
      setNotification({ message, type });
  };

  // Function to close the notification
  const closeNotification = () => {
      setNotification({ message: '', type: '' });
  };

  const [first_name, set_first_name] = useState("")
  const [last_name, set_last_name] = useState("")
  const [info, set_info] = useState("")

  const [user_info, set_user_info] = useState(JSON.parse(localStorage.getItem("user_info")))

  const handleChange1 = async () => {
    try{
      const user = JSON.parse(localStorage.getItem("user"))

      const user_document = await getDocumentByEmail(databaseId, collectionId, user.email)

      const { $id, $collectionId, $databaseId, ...document_data } = user_document;

      const result = await updateDocument(
        databaseId,
        collectionId,
        $id,
        {
          ...document_data,
          first_name,
          last_name,
          info,
        }
      )

      localStorage.setItem("user_info", JSON.stringify(result));

      showNotification("Profile info updated.", "success");

    } catch(error)
    {
      console.error(error);
    }
  }

  return (
    <>
    <div className="account_container">
      <Navigation2/>

      <div className="account_user">
        <img src="/user_placeholder1.jpg"/>
        <h1>
          {user_info.first_name} {user_info.last_name}
        </h1>
        <p>
        {user_info.info}
        </p>
        <button 
          onClick={() => logout()}
        >
          Log-out
        </button>
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
          Change Password
        </p>
        <p>
          Enable Multi-Factor
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
          value={first_name}
          onChange={(e) => set_first_name(e.target.value)}
        />
        <br/>
        <input 
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => set_last_name(e.target.value)}
        />
        <br/>
        <textarea 
          placeholder="Your Info"
          value={info}
          onChange={(e) => set_info(e.target.value)}
        >
        </textarea>
        <br/>
        <button onClick={handleChange1}>
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
          placeholder='Password'
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
          Multi-Factor Authentication
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
        <br/>
        <br/>
      </div>
      
      <Notification
        message={notification.message}
        type={notification.type}
        duration={3000} // optional, default is 3000ms
        onClose={closeNotification}
      />
    </div>
    </>
  )
}

export default Account