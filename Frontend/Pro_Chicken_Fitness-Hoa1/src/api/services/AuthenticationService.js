import AxiosInstance from "../../config/AxiosInstance";

class AuthenticationService {
  login = async (username, password) => {
    try {
      const response = await AxiosInstance.post("/authentication/login", {
        username,
        password,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  signup = async (username, password) => {
    try {
      const response = await AxiosInstance.post("/authentication/register", {
        username,
        password,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  isAdmin = async () => {
    try {
      const response = await AxiosInstance.get("/authentication/admin");
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new AuthenticationService();
