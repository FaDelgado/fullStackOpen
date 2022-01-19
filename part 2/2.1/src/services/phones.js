import axios from "axios";

const url = "http://localhost:3001/persons";

const getData = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const postData = (newObject) => {
  const request = axios.post(url, newObject);
  return request.then((response) => response.data);
};

const deleteData = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request.then((response) => response.data);
};

const putData = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getData, postData, deleteData, putData };
