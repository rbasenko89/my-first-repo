import "dotenv/config";
import axios from "axios";
import "dotenv/config";

const BASE = process.env.CAT_BASE_URL || "https://api.thecatapi.com/v1";
const API_KEY = process.env.CAT_API_KEY;

export const http = axios.create({
  baseURL: BASE,
  headers: API_KEY ? { "x-api-key": API_KEY } : {},
});

export async function searchOneImage() {
  const { data } = await http.get("/images/search", {
    params: { limit: 1, size: "small", mime_types: "jpg,png" },
  });
  if (!Array.isArray(data) || !data[0]?.id) {
    throw new Error("No image returned");
  }
  return data[0]; // { id, url, ... }
}

export async function createFavourite(image_id: string, sub_id: string) {
  const { data, status } = await http.post("/favourites", { image_id, sub_id });
  return { data, status }; // data: {id, message}
}

export async function listFavourites(sub_id: string) {
  const { data } = await http.get("/favourites", { params: { sub_id } });
  return data; // array
}

export async function deleteFavourite(id: number) {
  const { data, status } = await http.delete(`/favourites/${id}`);
  return { data, status };
}

export async function createVote(
  image_id: string,
  sub_id: string,
  value: 1 | 0 | -1,
) {
  const { data, status } = await http.post("/votes", {
    image_id,
    sub_id,
    value,
  });
  return { data, status }; // data: {id, message}
}

export async function listVotes(sub_id: string) {
  const { data } = await http.get("/votes", { params: { sub_id } });
  return data; // array
}
