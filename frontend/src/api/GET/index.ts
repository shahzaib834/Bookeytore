import axios from 'axios';
import { BACKEND_PORT } from '../constants';
export const getData = async (
  path: string,
  page: number = 1,
  limit: number = 10,
  filter: string = ''
) => {
  const urlWithoutlimit = `${BACKEND_PORT}/${path}?page=${page}`;
  const urlWithlimit = `${BACKEND_PORT}/${path}?page=${page}&limit=${limit}&filter=${filter}`;
  let config = {
    method: 'get',
    url: limit ? urlWithlimit : urlWithoutlimit,
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
