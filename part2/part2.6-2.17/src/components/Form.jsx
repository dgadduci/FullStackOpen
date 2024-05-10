import Input from "./Input";
import Button from "./Button";
const Form = ({
  newName,
  handleNameInput,
  handleNewPerson,
  newPhone,
  handlePhoneInput,
}) => {
  return (
    <form>
      <Input label="name: " value={newName} handle={handleNameInput} />
      <Input label="number: " value={newPhone} handle={handlePhoneInput} />
      <Button label="add" handle={handleNewPerson} />
    </form>
  );
};

export default Form;
