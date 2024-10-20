import Navigation2 from './Navigation2'

import "../styles/Overview.css"
import { useState } from 'react';
import Stage from '../small_components/Stage';

const Overview = () => {

  const [view, setView] = useState(0);

  return (
    <div className="overview_container">
        <Navigation2/>
        <div className='overview_select'>
          <button onClick={() => setView(0)}>
            General Overview
          </button>
          <button onClick={() => setView(1)}>
            Project Overview
          </button>
        </div>
        {
          view == 1 ?
          <>
            <div className="overview_search">
              <h1>
                Search Project
              </h1>
              <input 
                type="text"
                placeholder='Project name'
              />
              <button>
                <img src="/search1.png"/>
                Search
              </button>
            </div>

            <div className="overview_list" style={{display: "flex"}}>
              <Stage
                name={`1. " Hello world "`}
                info={"This is the beginning of our interview preparation project"}
                date={new Date()}
                time={""}
              />
              <Stage
                name={`2. Easy Problems`}
                info={"In this stage our plan is to solve at least 100 problems of easy difficulty covering all major coding chapters"}
                date={new Date()}
                time={""}
              />
              <Stage
                name={`3. Dynammic Programming`}
                info={"We are going to focus on Dynammic Programming principles"}
                date={new Date()}
                time={""}
              />
              <Stage/>
            </div>
            
          </>
          :
          <>
          </>
        }
    </div>
  )
}

export default Overview