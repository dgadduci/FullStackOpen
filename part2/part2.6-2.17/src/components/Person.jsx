const Person = ({ person, handleDelete }) => {
  return (
    <p key={person.id}>
      {person.name}  {person.number}
      <button
        onClick={() => {
          if (window.confirm(`Delete ${person.name}`)) {
            handleDelete(person.id);
          }
        }}
      >
        delete
      </button>
    </p>
  );
};

export default Person;
