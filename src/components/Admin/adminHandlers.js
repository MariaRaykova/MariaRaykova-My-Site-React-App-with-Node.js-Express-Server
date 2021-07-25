import { API } from "../../config";

export const createCategory = (body) => {
  return fetch(`${API}/api/category`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCategory = (id) => {
  return fetch(`${API}/api/category/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};
export const createProduct =(body) => {
  return fetch("http://localhost:9999/api/product", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token")
    }
  })
    .then((promise) => promise.json())
    .catch((err)=>console.log(err));
}



