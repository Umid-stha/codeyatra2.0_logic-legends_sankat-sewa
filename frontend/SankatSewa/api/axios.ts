import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.3.14:8000",
})

export const axiosPrivate = axios.create({
  baseURL: "http://192.168.3.14:8000",
  headers: { "Content-Type": "application/json" },
});