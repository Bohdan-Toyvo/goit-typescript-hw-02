import axios from 'axios';
import { FetchDataResponse } from './components/App/App.types';

const MY_ACCESS_KEY = `eReDvR-V2pSZ-AGgGKEEpsud98gCQH5sYZa5a4jurlo`;

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchImages = async (
  query: string,
  currentPage: number,
): Promise<FetchDataResponse> => {
  const response = await axios.get<FetchDataResponse>('/search/photos', {
    params: {
      client_id: MY_ACCESS_KEY,
      query: query,
      page: currentPage,
      per_page: 12,
    },
  });
  return response.data;
};
