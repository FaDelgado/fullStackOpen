import React from "react";

const PersonForm = ({
  newName,
  handleAddName,
  newPhone,
  handleAddPhone,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleAddName} />
      </div>
      <br />
      <div>
        phone: <input value={newPhone} onChange={handleAddPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
