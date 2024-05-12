import Person from "./Person";

const List = ({ persons, handleDelete }) => {
  return persons.map((person) => {
    return (
      <div key={person.id}>
        <Person person={person} handleDelete={handleDelete}/>
      </div>
    );
  });
};

export default List;