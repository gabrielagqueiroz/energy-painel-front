// import { api } from "../../api";

export const userService = {
  login: async (user: {
    email: string;
    password: string;
  }): Promise<LoginResponse> => {
    // const response = await api.post("/login", user);

    if (user.email === "teste@email.com" && user.password === "123456") {
      return {
        token: "mocked-token",
      };
    } else {
      throw new Error("Login failed");
    }
  },
  //   if (response) {
  //     return response.data;
  //   }

  //   throw new Error("Login failed");
  // },
};
