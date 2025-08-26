// components/SearchBar.jsx
import { useState, useRef, useEffect } from "react"
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("")
  const [expanded, setExpanded] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value) // calls parent function to filter the list
  }

  return (
    <div className="searchbar-cont">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" style={{color: "#D94F04"}}>
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input
        type="text"
        placeholder="What are we cooking?"
        value={query}
        onChange={handleChange}
        className="search-field"
        />
    </div>
  )
}

export default SearchBar