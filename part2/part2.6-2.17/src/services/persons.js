import axios from "axios";
import MessageError from "../components/messageError";
import MessageConfirm from "../components/MessageConfirm";

const baseUrl = "http://localhost:3001/persons";

const getAll = (handleMessage) => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((error) => {
        handleMessage(MessageError("An error occurred while trying to retrieve the documents from the agenda"))
      console.log(error);
    });
};

const create = (newPerson, handleMessage) => {
  const request = axios.post(baseUrl, newPerson);
  return request
    .then(() => {
      handleMessage(MessageConfirm(`${newPerson.name} was add to the agenda`));
    })
    .catch((error) => {
      handleMessage(
        MessageError(`${newPerson.name} could not be added to the agenda`)
      );
      console.log(error);
    });
};

const remove = (id, handleMessage) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  request
    .then(() =>
      handleMessage(
        MessageConfirm("The person was removed from the agenda")
      )
    )
    .catch((error) => {
      handleMessage(MessageError("The person could not be removed from the agenda"));
      console.log(error);
    });
};

const update = (person, handleMessage) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person);
  request
    .then(() => handleMessage(MessageConfirm(`${person.name} was updated`)))
    .catch((error) => {
      handleMessage(MessageError(`${person.name} could not updated`));
      console.log(error);
    });
};

export default { getAll, create, remove, update };
