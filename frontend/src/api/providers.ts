import axios, { AxiosRequestConfig } from 'axios';
import { handleResponse, handleError } from './handlers';
import { RecipesType } from './types';

const BASE_URL = process.env.REACT_APP_SERVER_DEV;

const headers = {
  'Content-Type': 'application/json',
};
const getAll = async (resource: string) => {
  try {
    const data = await axios.get(`${BASE_URL}/${resource}`, { headers });
    return handleResponse(data);
  } catch (err) {
    return handleError(err);
  }
};

const getSingle = async (
  resource: string,
  id: string,
): Promise<RecipesType> => {
  try {
    const data = await axios.get(`${BASE_URL}/${resource}/${id}`, { headers });
    return handleResponse(data);
  } catch (err) {
    return handleError(err);
  }
};

const post = async (
  resource: string,
  model: AxiosRequestConfig | undefined,
) => {
  try {
    const data = await axios.post(`${BASE_URL}/${resource}`, model, {
      headers,
    });
    return handleResponse(data);
  } catch (err) {
    return handleError(err);
  }
};

const put = async (resource: string, recipe: any) => {
  try {
    const data = await axios.put(`${BASE_URL}/${resource}`, recipe, {
      headers,
    });
    return handleResponse(data);
  } catch (err) {
    return handleError(err);
  }
};

const patch = async (
  resource: string,
  model: AxiosRequestConfig | undefined,
) => {
  try {
    const data = await axios.patch(`${BASE_URL}/${resource}`, model, {
      headers,
    });
    return handleResponse(data);
  } catch (err) {
    return handleError(err);
  }
};

const remove = async (resource: string, id: string) => {
  try {
    const data = await axios.delete(`${BASE_URL}/${resource}/${id}`, {
      headers,
    });
    return handleResponse(data);
  } catch (err) {
    return handleError(err);
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
