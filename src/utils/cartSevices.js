export const getCartStorage = () => {
  const cart = window.sessionStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return false;
  }
};

export const addToCartSorage = (body) => {
  window.sessionStorage.setItem("cart", JSON.stringify(body));
};
export const clearCartStorage = () => {
  window.sessionStorage.removeItem("cart");
};
