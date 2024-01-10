import axios from 'axios'

const API_KEY = 'live_9vuFOVhq0i1OnCSg4BFzKwG3fY7ZMSeAsfxvxZmsTvbmm2jOVONhNvSGmSnsk006'

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY
}

export const catBreeds = async () => {
  const url = 'https://api.thecatapi.com/v1/breeds'
  const response = await axios.get(url, { headers })
  return response.data
}

export const catImages = async (breedId: string, page = 1, limit = 10) => {
  const url = `https://api.thecatapi.com/v1/images/search?page=${page}&limit=${limit}&breed_id=${breedId}`
  const response = await axios.get(url, { headers })
  return response.data
}

export const catSingle = async (id: string) => {
  const url = `https://api.thecatapi.com/v1/images/${id}`
  const response = await axios.get(url, { headers })
  return response.data
}