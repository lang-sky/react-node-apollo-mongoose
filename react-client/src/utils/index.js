export const isExistLocalToken = () => {
  const expiresAt = Number(localStorage.getItem('expires_at'));
  const token = localStorage.getItem('token');
  return !!token && expiresAt > Date.now();
};
