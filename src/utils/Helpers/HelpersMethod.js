import { url, test_url } from "../Data/BaseURL"

export const goToURL = (url, newTab = true) => {
  if (newTab) {
    window.open(url, "_blank")
  } else {
    window.open(url, "_self")
  }
}

export const sendRequest = async (endpoint = '', method = 'GET', body, test = true) => {
  const URL = test ? test_url : url;
  const response = await fetch(`${URL}${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  const data = await response.json();

  return data;
}