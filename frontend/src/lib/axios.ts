import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // যেটা .env থেকে এসেছে
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // যদি cookie-based auth use করো
});

export default axiosInstance;
