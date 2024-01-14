export const getCustomerToken = () => {
  return localStorage.getItem("customer_token");
};
export const clearCustomerToken = () => {
  localStorage.removeItem("customer_token");
};

export const getManagerToken = () => {
  return localStorage.getItem("manager_token");
};

export const clearManagerToken = () => {
  localStorage.removeItem("manager_token");
};
