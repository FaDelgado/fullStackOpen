import React from "react";

const Persons = ({ person }) => (
  <div>
    <p>
      {person.name} {person.number}
    </p>
  </div>
);

export default Persons;
