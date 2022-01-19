import React, { useState } from "react";

const Filter = ({ persons }) => {
  const [newSearch, setNewSearch] = useState("");

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };

  const handleClicToSearch = () => {
    if (!newSearch) return alert("Fill the search field");
    let found = false;
    persons.forEach((f, index) => {
      if (
        !found &&
        f.name.length === newSearch.length &&
        f.name.toLowerCase().includes(newSearch.toLowerCase())
      ) {
        found = true;
        return alert(`${f.name} have the phone number: ${f.number}`);
      }
      if (!found && index + 1 === persons.length)
        return alert("Person not found");
    });
  };

  return (
    <div>
      <div>
        search:{" "}
        <input
          value={newSearch}
          onChange={handleSearch}
          placeholder="search by name"
        />
      </div>
      <div>
        <button type="button" onClick={handleClicToSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Filter;
