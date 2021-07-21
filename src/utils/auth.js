
export const getToken = () => {
  return window.localStorage.getItem("token");
};

export const isAuthenticated = () => {
  const token = getToken();
  if (token) {
    return token;
  } else {
    return false;
  }
};


