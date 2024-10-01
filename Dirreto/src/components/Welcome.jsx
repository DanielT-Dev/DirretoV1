import React from 'react'

const Welcome = () => {
  return (
    <div className="welcome_container">
        <div className="welcome_box">
            <div className="welcome_box_header">
                <h1>
                    Ready to Direct Your Projects to Success with Dirreto?
                </h1>
            </div>
            <div className="row">
              <div className="sign_up_side">
                <h1>
                  Sign-Up
                </h1>
                <h2>
                  To create a new Dirreto account
                </h2>
                <button>
                  Go
                </button>
              </div>
              <div className="sign_in_side">
                <h1>
                  Sign-In            
                </h1>
                <h2>
                  To access your Dirreto account
                </h2>
                <button>
                  Go
                </button>
              </div>
              <h2 className="detail1">
                Or
              </h2>
              <div className="detail2">

              </div>
            </div>
        </div>
    </div>
  )
}

export default Welcome