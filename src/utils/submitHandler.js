import { API } from "../config";

export const logInHandler = (body) => {
  return fetch(`${API}/api/user/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      window.localStorage.setItem("token", res.headers.get("Authorization"));
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const registerHandler = (body) => {
  return fetch(`${API}/api/user/register`, {
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
//това ще е тук ако logOut-а го правим с бутон submit и хендлъра в Header Components, аз го направих с Routes сега
// export const logOutHandler = () => {
//   // document.cookie =
//   //   "x-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//   window.localStorage.clear();
//   //може да направим fetch към logout в restapi
// };
