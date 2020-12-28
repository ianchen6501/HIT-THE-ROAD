export function getAll(url) {
  return fetch(url)
  .then(response => response.json())
}

export function updateSchedule(url, json) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: json
  })
  .then(response => response.json())
}