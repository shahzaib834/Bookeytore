import axios from 'axios';
export const getData = async (path: string, page: number = 1) => {
  let config = {
    method: 'get',
    url: `http://localhost:5000/${path}?page=${page}`,
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

export const getSingleData = async (path: string, id: string | undefined) => {
  let config = {
    method: 'get',
    url: `http://localhost:5000/${path}/${id}`,
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
