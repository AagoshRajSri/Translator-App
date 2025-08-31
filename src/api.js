import axios from "axios";

const API_URL = "http://localhost:5000/translate"; // backend URL

export async function translateToFrench(text) {
  const response = await axios.post(API_URL, { text });
  return response.data?.translation || "Translation failed";
}
