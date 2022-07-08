import axios from "axios";

const baseURL = "/api/persons";

function getData() {
  return axios.get(baseURL).then((response) => response.data);
}
function postData(newObj) {
  return axios.post(baseURL, newObj).then((response) => response.data);
}

function deleteData(id) {
  return axios.delete(`${baseURL}/${id}`).then((response) => response.data);
}
function putData(id, newObj) {
  return axios
    .put(`${baseURL}/${id}`, newObj)
    .then((response) => response.data);
}

const functions = { getData, postData, deleteData, putData };

export default functions;
