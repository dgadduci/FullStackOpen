import axios from "axios";
import MessageError from "../components/messageError";
import MessageConfirm from "../components/MessageConfirm";

const baseUrl = "/api/persons";

const getAll = (handleMessage) => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((error) => {
      handleMessage(
        MessageError(
          "An error occurred while trying to retrieve the documents from the agenda"
        )
      );
    });
};

const create = (newPerson, handleMessage) => {
  const request = axios.post(baseUrl, newPerson);
  return request
    .then((person) => {
      handleMessage(MessageConfirm(`${newPerson.name} was add to the agenda`));
      return person;
    })
    .catch((error) => {
      handleMessage(MessageError(error.response.data.error));
    });
};

const remove = (id, handleMessage) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  request
    .then(() =>
      handleMessage(MessageConfirm("The person was removed from the agenda"))
    )
    .catch((error) => {
      handleMessage(
        MessageError("The person could not be removed from the agenda")
      );
    });
};

const update = (person, handleMessage, onUpdate) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person);
  request
    .then(() => {
      handleMessage(MessageConfirm(`${person.name} was updated`));
      onUpdate();
    })
    .catch((error) => {
      handleMessage(MessageError(error.response.data.error));
    });
};

export default { getAll, create, remove, update };