import axios from "axios";

export const client = axios.create({
  baseURL: "127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});
