import axios from 'axios';
import { handleResponse, handleError } from './handlers';
import { RecipesType } from './types';
import { getAuthHeaders } from './auth';
const BASE_URL = process.env.REACT_APP_SERVER_DEV;

const getAll = async (resource: string) => {
  try {
    const data = await axios.get(`${BASE_URL}/${resource}`, {
      headers: getAuthHeaders(),
    });
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
    const response = await axios.get(`${BASE_URL}/${resource}/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const post = async (resource: string, data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/${resource}`, data, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const postAuth = async (resource: string, model: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/${resource}`, model, {
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const put = async (resource: string, recipe: any) => {
  try {
    const data = await axios.put(`${BASE_URL}/${resource}`, recipe, {
      headers: getAuthHeaders(),
    });
    return handleResponse(data);
  } catch (err) {
    return handleError(err);
  }
};

const remove = async (resource: string, id: string) => {
  try {
    const data = await axios.delete(`${BASE_URL}/${resource}/${id}`, {
      headers: getAuthHeaders(),
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
  postAuth,
  put,
  remove,
};
