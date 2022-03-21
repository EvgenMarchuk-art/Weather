import axios from 'axios';

export const fetchWeather = (query: string): Promise<any> => {
  const request = {
    method: 'GET' as any,
    url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
    params: {q: query},
    headers: {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': '46eaf354dcmsh4a52e63479396eep1d59d8jsn0541dbc06132',
    },
  };

  return axios.request(request);
};
