/* https://dev.to/mmcshinsky/a-simple-approach-to-managing-api-calls-1lo6 */
export function handleResponse(response: { results?: any; data?: any }) {
  if (response.results) {
    return response.results;
  }

  if (response.data) {
    return response.data;
  }
  return response;
}

export function handleError(error: { data: any }) {
  if (error.data) {
    return error.data;
  }
  return error;
}
