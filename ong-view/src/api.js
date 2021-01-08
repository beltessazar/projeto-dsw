import axios from "axios";

export default axios.create({
    baseURL: "localhost:3030",
    header: {
        Accept: "application/json",
        "Content-type": "application/json"
    },
    withCredentials: true,
});