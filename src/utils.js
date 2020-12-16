const TOKEN_NAME = 'token'

export const setAuthTokenToLocalStorage = (token) => {
  localStorage.setItem(TOKEN_NAME, JSON.stringify(token))
}

export const getAuthTokenFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(TOKEN_NAME))
}

export const deleteAuthTokenFromLocalStorage = () => {
  return localStorage.removeItem('token')
}

