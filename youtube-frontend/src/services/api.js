import axios from "axios";

export const fetchVideoDetails = async () => {
  const res = await axios.get("http://localhost:3000/video", { withCredentials: true });
  return res.data;
};