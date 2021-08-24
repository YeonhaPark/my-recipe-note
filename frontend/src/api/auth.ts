export const getAuthHeaders = () => {
  const jwtToken = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwtToken}`,
  };
};
