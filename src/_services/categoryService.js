import axios from "axios";

export const categoryService = {
  save,
  getAll,
  update,
};

async function save(data) {
  console.log("services");
  return await axios
    .post("http://localhost:8082/category", data)

    .then((res) => res.data);
}
async function update(id, data) {
  console.log("services");
  return await axios
    .put("http://localhost:8082/category/" + id, data)
    .then((res) => res.data)
    .catch(handleResponse);
}
async function getAll() {
  console.log("service call");
  return await axios
    .get("http://localhost:8082/category")
    .then((res) => res.data);
}

function handleResponse(response) {
  return Promise.reject(response.response.data.message);
  // if (response.status==401) {
  //     // if (response.status === 401) {
  //     //     // auto logout if 401 response returned from api
  //     //     // logout();
  //     //     // location.reload(true);
  //     // }

  //     const error = "Unauthorized";
  //     // const error = (data && data.message) || response.statusText;
  //     return Promise.reject(error);
  // }

  // return response.data;
}
