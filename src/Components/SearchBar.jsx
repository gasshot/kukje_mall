import React from 'react'

const SearchBar = () => {
  
  
    const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
    console.log("검색어:", searchTerm);
  };
  
    return (



    <div>    
        <form onSubmit={handleSearch}>
            <input type="text" />
        </form>
    </div>

  )
}

export default SearchBar