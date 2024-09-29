import { api } from "../../api";

export const userService = {
  login: async (user: {
    email: string;
    password: string;
  }): Promise<LoginResponse> => {
    const response = await api.post("/login", user); 
    if (response) {
      return response.data;
    }

    throw new Error("Login failed");
  },
};
