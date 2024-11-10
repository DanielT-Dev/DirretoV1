import React from 'react'
import './SearchBar.css'

const SearchBar = () => {
  return (
    <div className='search_bar_container'>
        <span>
          CTRL + K
        </span>
        <img src="/search2.png"/>
        <input 
            type="text"
            placeholder="Search project..."
        />
        
    </div>
  )
}

export default SearchBar