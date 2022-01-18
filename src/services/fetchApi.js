const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = async () => {
  const response = await fetch(URL);
  const JSON = await response.json();
  return JSON;
};

export default fetchApi;
