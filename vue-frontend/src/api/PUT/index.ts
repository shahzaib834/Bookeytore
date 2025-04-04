import axios from 'axios';
import { BACKEND_PORT } from '../constants';
export const updateDataById = async (path: string, id: string, data = {}) => {
  let config = {
    method: 'put',
    url: `${BACKEND_PORT}/${path}/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: JSON.stringify(data),
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
