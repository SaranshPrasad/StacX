import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)
const API = axios.create({
  baseURL: `${API_URL}/api/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

// SIGNUP
export const signup = (data) => API.post("/signup", data);

// LOGIN
export const login = (data) => API.post("/login", data);

// LOGOUT
export const logout = (token) =>
  API.post("/logout", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// ME
export const getMe = (token) =>
  API.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });