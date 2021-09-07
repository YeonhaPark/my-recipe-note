/* https://dev.to/mmcshinsky/a-simple-approach-to-managing-api-calls-1lo6 */

export function handleResponse(response: {
  results?: any;
  status?: number;
  data?: any;
}) {
  if (response.data.status === 401) {
    console.log('여기까지옴');
    throw new Error(response.data.message);
  }
  if (response.data.status === 409) {
    throw new Error(response.data.message);
  }
  if (response.data.status > 299 || response.data.status < 200) {
    if (response.data.message) {
      throw new Error(response.data.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
  if (response.results) {
    return response.results;
  }
  if (response.data) {
    return response.data;
  }
  return response;
}

export function handleError(error: { status: any; data: any }) {
  if (error.status === 401) {
    localStorage.clear();
    return error;
  }
  if (error.data) {
    return error.data;
  }
  return error;
}
