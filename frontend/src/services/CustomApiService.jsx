import axios from "axios";

// Create a single axios instance (singleton)
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_APP_NAME}/` || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies in requests
});

// Intercept responses globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject({
      message: error.response?.data?.message || "Something went wrong!",
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      config: error.config,
    })
);

// Main service function returning API methods
const CustomApiService = () => {
  // GET request
  const GET = async (endpoint, params = {}, headers = {}) => {
    try {
      const res = await apiClient.get(`/${endpoint}`, { params, headers });
      return { ...res.data, headers: res.headers };
    } catch (error) {
      throw error;
    }
  };

  // POST request
  const POST = async (endpoint, params = {}, headers = {}, data) => {
    try {
      const res = await apiClient.post(`/${endpoint}`, data, { params, headers });
      return { ...res.data, headers: res.headers };
    } catch (error) {
      throw error;
    }
  };

  // PATCH request
  const PATCH = async (endpoint, params = {}, headers = {}, data, id) => {
    try {
      const res = await apiClient.patch(`/${endpoint}/${id}`, data, { params, headers });
      return { ...res.data, headers: res.headers };
    } catch (error) {
      throw error;
    }
  };

  // DELETE request
  const DELETE = async (endpoint, params = {}, headers = {}, id) => {
    try {
      const res = await apiClient.delete(`/${endpoint}/${id}`, { params, headers });
      return { ...res.data, headers: res.headers };
    } catch (error) {
      throw error;
    }
  };

  return { GET, POST, PATCH, DELETE };
};

export default CustomApiService;
