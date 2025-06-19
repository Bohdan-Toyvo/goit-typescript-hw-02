import axios from 'axios';


const MY_ACCESS_KEY = `eReDvR-V2pSZ-AGgGKEEpsud98gCQH5sYZa5a4jurlo`;

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchImages = async (query, currentPage) => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: MY_ACCESS_KEY,
      query: query,
      page: currentPage,
      per_page: 12,
    },
  });
  return response.data;
};