export function getAll(url) {
  return fetch(url)
  .then(response => response.json())
}