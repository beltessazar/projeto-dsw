import axios from "axios";

export default axios.create({
    baseURL: "localhost:8888",
    header: {
        Accept: "application/json",
        "Content-type": "application/json",
    },
    withCredentials: false,
});