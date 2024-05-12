import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Title from "./components/Title";
import List from "./components/List";
import Form from "./components/Form";
import personService from "./services/persons";
import MessageBar from "./components/MessageBar";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setFilterName] = useState("");
  const[message, setMessage]= useState(null);

  //load initial data from server
  useEffect(() => {
    personService.getAll(handleMessage).
    then(response => {
      setPersons(response);
    });
  }, []);

  //handlers UI components
  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneInput = (event) => {
    setNewPhone(event.target.value);
  };

  const handleNewPerson = (event) => {
    event.preventDefault();
    const person =persons.find((person) => person.name.toLowerCase() === newName.toLocaleLowerCase());
    if (person === undefined) {
      const newPerson={ name: newName, number: newPhone, id: (persons.length + 1).toString() };
      setPersons([
        ...persons,
        newPerson,
      ]);
      setNewName("");
      setNewPhone("");
      personService.create(newPerson, handleMessage);
    } else {
      //confirm if update person
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        //update repository
        person.number = newPhone;
        personService.update(person, handleMessage);
        //update UI
        setPersons(
          persons.map((p)=> p.id != person.id ? p : person)
        );
      }
    }
  };

  const handleDeletePerson =(id)=>{
    personService.remove(id, handleMessage);
    setPersons( persons.filter(person => person.id != id));
  }

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  const handleMessage =(message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  }

  const personsShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <MessageBar message = {message}/>
      <Filter
        label="filter shown with: "
        value={filterName}
        handle={handleFilterName}
      />
      <Title text="add a new" />
      <Form
        newName={newName}
        newPhone={newPhone}
        handleNameInput={handleNameInput}
        handleNewPerson={handleNewPerson}
        handlePhoneInput={handlePhoneInput}
      />
      <Title text="Numbers" />
      <List persons={personsShow} handleDelete={handleDeletePerson}/>
    </div>
  );
};

export default App;
