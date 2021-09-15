import axios from 'axios';
import { handleResponse, handleError } from './handlers';
import {
  GetRecipeType,
  PostRecipeType,
  GetRecipeParams,
  GetRecipeResult,
} from './types';
import { getAuthHeaders } from './auth';
const BASE_URL = process.env.REACT_APP_SERVER_DEV;

const getAuth = async () => {
  try {
    const { data, status } = await axios.get(`${BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    console.log('data::======', data);
    if (status === 401) {
      throw new Error(data.message);
    }
    return handleResponse(data);
  } catch (err) {
    alert(err);
  }
};

const getAll = async (
  resource: string,
  params?: GetRecipeParams,
): Promise<GetRecipeResult[]> => {
  try {
    const data = await axios.get(`${BASE_URL}/${resource}`, {
      headers: getAuthHeaders(),
      params,
    });
    return handleResponse(data);
  } catch (err: any) {
    return handleError(err.response);
  }
};
const getTags = async (resource: string, params?: any) => {
  try {
    const data = await axios.get(`${BASE_URL}/${resource}`, {
      headers: getAuthHeaders(),
      params,
    });
    return handleResponse(data);
  } catch (err: any) {
    return handleError(err.response);
  }
};

const getSingle = async (
  resource: string,
  id: number,
): Promise<GetRecipeType> => {
  try {
    const response = await axios.get(`${BASE_URL}/${resource}/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (err: any) {
    return handleError(err.response);
  }
};

const post = async (resource: string, data: PostRecipeType) => {
  try {
    const response = await axios.post(`${BASE_URL}/${resource}`, data, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (err: any) {
    return handleError(err.response);
  }
};

const postAuth = async (resource: string, model: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/${resource}`, model, {
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  } catch (err: any) {
    return handleError(err.response);
  }
};

const put = async (resource: string, recipe: any) => {
  try {
    const data = await axios.put(`${BASE_URL}/${resource}`, recipe, {
      headers: getAuthHeaders(),
    });
    return handleResponse(data);
  } catch (err: any) {
    return handleError(err.response);
  }
};

const remove = async (resource: string, id: string) => {
  try {
    const data = await axios.delete(`${BASE_URL}/${resource}/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(data);
  } catch (err: any) {
    return handleError(err.response);
  }
};

export const apiProvider = {
  getAuth,
  getAll,
  getTags,
  getSingle,
  post,
  postAuth,
  put,
  remove,
};
