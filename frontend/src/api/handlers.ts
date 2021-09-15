/* https://dev.to/mmcshinsky/a-simple-approach-to-managing-api-calls-1lo6 */

export function handleResponse(response: {
  results?: any;
  status?: number;
  data?: any;
}) {
  if (response.results) {
    return response.results;
  }
  if (response.data) {
    return response.data;
  }
  return response;
}

export function handleError(error: any) {
  console.log('====handleError', error);
  if (error.status === 400) {
    throw new Error(error.data.message);
  }
  if (error.status === 401) {
    localStorage.clear();
    throw new Error(error.data.message);
  }
  if (error.status === 409) {
    throw new Error(error.data.message);
  }
  if (error.status > 299 || error.status.status < 200) {
    if (error.data.message) {
      throw new Error(error.data.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
  if (error.data.message) {
    return error.data.message;
  }
  return error;
}
