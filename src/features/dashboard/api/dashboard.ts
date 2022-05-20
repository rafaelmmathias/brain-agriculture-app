import axios from "axios";
import { API_BASE_URL } from "../../../config";
const baseUrl = API_BASE_URL;

export const getDashboard = async () => {
  const response = await axios.get(`${baseUrl}/dashboard`);

  return response.data;
};
