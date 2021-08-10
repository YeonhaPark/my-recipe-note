import axios, { AxiosRequestConfig } from 'axios';
import { handleResponse, handleError } from './handlers';

const BASE_URL = process.env.REACT_APP_SERVER_DEV;
const getAll = async (resource: string) => {
  try {
    const data = await axios.get(`${BASE_URL}/${resource}`);
    handleResponse(data);
  } catch (err) {
    handleError(err);
  }
};

const getSingle = async (resource: string, id: string) => {
  try {
    const data = await axios.get(`${BASE_URL}/${resource}/${id}`);
    handleResponse(data);
  } catch (err) {
    handleError(err);
  }
};

const post = async (
  resource: string,
  model: AxiosRequestConfig | undefined,
) => {
  try {
    const data = await axios.post(`${BASE_URL}/${resource}`, model);
    handleResponse(data);
  } catch (err) {
    handleError(err);
  }
};

const put = async (resource: string, model: AxiosRequestConfig | undefined) => {
  try {
    const data = await axios.put(`${BASE_URL}/${resource}`, model);
    handleResponse(data);
  } catch (err) {
    handleError(err);
  }
};

const patch = async (
  resource: string,
  model: AxiosRequestConfig | undefined,
) => {
  try {
    const data = await axios.patch(`${BASE_URL}/${resource}`, model);
    handleResponse(data);
  } catch (err) {
    handleError(err);
  }
};

const remove = async (resource: string, id: string) => {
  try {
    const data = await axios.delete(`${BASE_URL}/${resource}/${id}`);
    handleResponse(data);
  } catch (err) {
    handleError(err);
  }
};

export const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  patch,
  remove,
};
