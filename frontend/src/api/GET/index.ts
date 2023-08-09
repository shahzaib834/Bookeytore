import axios from 'axios';
export const getData = async (path: string) => {
  let config = {
    method: 'get',
    url: `http://localhost:5000/${path}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const response = await axios
    .request(config)
    .then(async (response) => {
      return response.data;
    })
    .catch(async (error) => {
      return error;
    });
  return response;
};
