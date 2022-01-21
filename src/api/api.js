import axios from "axios";

const api = axios.create({
  baseURL: "https://back-consultoria-online-test.herokuapp.com",
  headers: {
    Authorization: "Bearer "
  }
});

export default api;
