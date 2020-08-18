function request <T> (method: string, url: string, body?: object): Promise<T> {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => Promise.reject(data))
      }
      return res.json()
    })
}

const Api = {
  GET: <T>(url: string, body?: object): Promise<T> => request('get', url, body),
  POST: <T>(url: string, body?: object): Promise<T> => request('post', url, body),
  PUT: <T>(url: string, body?: object): Promise<T> => request('put', url, body),
  PATCH: <T>(url: string, body?: object): Promise<T> => request('patch', url, body),
  DELETE: <T>(url: string, body?: object): Promise<T> => request('delete', url, body)
}

export default Api
