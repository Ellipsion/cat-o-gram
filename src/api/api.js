import axios from "axios";

const baseApi = "https://api.thecatapi.com/v1/images";
const apiKey =
  "live_j2hYHgOmRuMdHZz5aC4gBGrqWyJmhb91yTTIYSg5zokI3f0Ql8PJF7g7ogDutNa8";

export const fetchCatImages = async ({ pageParam = 0 }) => {
  return await axios({
    method: "get",
    url: `/search?limit=10&page=${pageParam}`,
    baseURL: baseApi,
    headers: {
      "x-api-key": apiKey,
    },
  }).then((res) => res.data);
};
