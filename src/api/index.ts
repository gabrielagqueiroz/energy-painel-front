import axios from "axios";

export const api = axios.create({
  baseURL: "https://charge-e.me2.com.br/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user');
    if (token) {
      const user = JSON.parse(token);
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getCep = async (cep: string): Promise<any> => {
  return await api.get(`https://viacep.com.br/ws/${cep}/json/`);
};

export const getOrders = async (): Promise<any> => {
  return await fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = async (): Promise<any> => {
  return await fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = async (): Promise<any> => {
  return await fetch("https://dummyjson.com/products").then((res) =>
    res.json()
  );
};

export const getCustomers = async (): Promise<any> => {
  return await fetch("https://dummyjson.com/users").then((res) => res.json());
};

export const getComments = async (): Promise<any> => {
  return await fetch("https://dummyjson.com/comments").then((res) =>
    res.json()
  );
};
