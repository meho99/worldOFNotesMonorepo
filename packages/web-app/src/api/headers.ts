export const createAuthHeaders = () => {
  const token = localStorage.getItem('token') as string

  return {
    authorization: token,
  }
}
