import axios from "axios";

export const LoginApi = async (userId: string, password: string) => {
  const response = await axios.post(
    `${import.meta.env.REACT_APP_API_BASE_URL}/login`,
    {
      userId,
      password,
    }
  );
  return response;
};

export const LogoutApi = async () => {
  const response = await axios.get(
    `${import.meta.env.REACT_APP_API_BASE_URL}/logout`
  );
  return response;
};
