import axios from "axios";

export const productService = {
  save,
  getAll,getAllBill,update,getAllPrice,saveBill
};

async function save(data) {
    console.log("product");
  return await axios
    .post("http://localhost:8082/product", data)

    .then((res) => res.data)
    .catch(handleResponse);
}
async function saveBill(data) {
  return await axios
    .post("http://localhost:8082/bill", data)

    .then((res) => res.data)
    .catch(handleResponse);

}

async function update(id,data) {
    console.log("product");
  return await axios
    .put("http://localhost:8082/product/"+id, data)

    .then((res) => res.data)
    .catch(handleResponse);

}
async function getAll(data={}) {
  console.log("service call")
  return await axios
    // .get("http://localhost:8080/product",{ params:data })
    .get("http://localhost:8082/product",{ params:data })
    .then((res) => res.data)
    .catch(handleResponse);

}
async function getAllBill(data={}) {
  console.log("service call")
  return await axios
    .get("http://localhost:8082/bill",{ params:data })
    .then((res) => res.data)
    .catch(handleResponse);

}
async function getAllPrice(id) {
  console.log("service call")
  return await axios
    .get("http://localhost:8082/price/"+id)
    .then((res) => res.data)
    .catch(handleResponse);

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
