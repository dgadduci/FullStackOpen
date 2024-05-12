import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "/api/notes";

const App = () => {
  //state
  const [notes, setNotes] = useState([]);

  const getAll = () => {
    const request = axios.get(baseUrl);
    return request
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    /*
  Because the API 'https://studies.cs.helsinki.fi/restcountries/api/name/' only accepts full 
  country names and does not return results if only part of the country name are 
  entered, I have had to resort to the API 'https://studies.cs.helsinki.fi/restcountries/api/all'
  that returns the entire list of countries at init, in order to then work on filtering that total 
  list of countries.
  */
    getAll().then((response) => {
      console.log("cargo notas desde API");
      //assign id for every countrie item
      let id = 0;
      response.map((countrie) => {
        countrie.id = id;
        id++;
      });
      setNotes(response);
    });
  }, []);
  return (
    <>
      <p>Notes</p>
      {notes.map((note)=> <h3 key={note.id}>{note.id} : {note.content} </h3>)}
    </>
  );
};

export default App;
