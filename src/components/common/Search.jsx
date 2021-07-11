import React from 'react';

function Search(props) {
    function onSearchTextChange(e){
        props.search(e.target.value);
    }

    return (
        <div className="search">
            <label htmlFor="search" className="search__label">Search</label>
            <input onInput={onSearchTextChange} id="search" value={props.searchText} className="search__input" placeholder="Enter Name" type="text"/>
        </div>
    );
}

export default Search;