import React from 'react'

const Projects = () => {
  return (
    <div>
        <div className="projects_container">
            <h1>
                Search Project
            </h1>
            <input 
              type="text"
              placeholder='Project Name'
            />
            <button>
              <img src="/search1.png"/>
              Search
            </button>

            <p>
              Filter Projects By 
            </p>
            <div style={{display: "flex", flexDirection: "row"}}>
              <button class="projects_button">
                Public
              </button>
              <button class="projects_button">
                Private
              </button>
            </div>
            <div style={{display: "flex", flexDirection: "row"}}>
              <button class="projects_button">
                Newest
              </button>
              <button class="projects_button">
                Oldest
              </button>
            </div>
            <div style={{display: "flex", flexDirection: "row"}}>
              <button class="projects_button">
                Best Rating
              </button>
              <button class="projects_button">
                Most Views
              </button>
            </div>
            
        </div>
        <div className="list_container">
            <div className="project">

            </div>
            <div className="project">
                
            </div>
            <div className="project">
                
            </div>
        </div>
    </div>
  )
}

export default Projects