export interface Image {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
}

export interface FetchDataResponse {
  results: Image[];
  total_pages: number;
  total: number;
}
