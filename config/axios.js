import axiosModule from "axios";

const axios = axiosModule.create({
    baseURL : "https://filmseries.iran.liara.run"
});

export default axios;