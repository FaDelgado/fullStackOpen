import React, { useState, useEffect } from "react";
import Persons from "./components/2-6/Persons";
import Filter from "./components/2-6/Filter";
import PersonForm from "./components/2-6/PersonForm";
import phoneServices from "./services/phones";

const App26 = () => {
  // axios
  //   .get("http://localhost:3001/notes")
  //   .then((response) => {
  //     const promise1 = response.data;
  //     console.log(promise1);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // axios
  //   .get("http://localhost:3001/foobar")
  //   .then((response) => {
  //     const promise2 = response.data;
  //     console.log(promise2);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  //2.11 useEffect
  useEffect(() => {
    phoneServices.getData().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleAddName = (event) => {
    setNewName(event.target.value);
  };

  const handleAddPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newName || !newPhone) {
      alert("All fields are required!");
      return;
    }

    let isEqual = false;
    persons.forEach((a) => {
      if (
        a.name.length === newName.length &&
        a.name.toLowerCase().includes(newName.toLowerCase())
      ) {
        // alert(`${newName} Name already exists!`);
        // isEqual = true;
        // return;
        if (
          window.confirm(
            `${newName} Name already exists! Replace the old number with a new one?`
          )
        ) {
          const putNewPersonObj = { name: newName, number: newPhone };
          phoneServices.putData(a.id, putNewPersonObj).then((response) => {
            // Se hace el map dentro del setPersons para que se actualice el state
            setPersons(
              // Nuevo array con el objeto modificado, cuando se encuentre el mismo id lo modifica por la respuesta del put
              // sino deja los datos del objeto original
              persons.map((person) =>
                person.id !== response.id ? person : response
              )
            );
          });
        }
        isEqual = true;
        return;
      }
    });
    if (!isEqual) {
      const personObject = { name: newName, phone: newPhone };

      phoneServices.postData(personObject).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewPhone("");
      });
    }
  };

  const deletePerson = (id) => {
    const delPerson = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${delPerson.name}?`)) {
      phoneServices.deleteData(id).then((response) => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />
      <h3>Add a new</h3>
      <PersonForm
        handleAddName={handleAddName}
        handleAddPhone={handleAddPhone}
        handleSubmit={handleSubmit}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>
          <Persons person={person} />
          <button onClick={() => deletePerson(person.id)}>borrar</button>
        </div>
      ))}
    </div>
  );
};

export default App26;
