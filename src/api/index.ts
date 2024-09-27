import axios from "axios";

export const api = axios.create({
  baseURL: "https://charge-e.me2.com.br/",
});

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
