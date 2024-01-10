import axios from 'axios'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const API_KEY = 'live_9vuFOVhq0i1OnCSg4BFzKwG3fY7ZMSeAsfxvxZmsTvbmm2jOVONhNvSGmSnsk006'

const toast = useToast();

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY
}

const handleRequest = async (url: string) => {
  try {
    const response = await axios.get(url, { headers })
    return response.data
  } catch(_e) {
    toast.open({
      message: 'Apologies but we could not load new cats for you at this time! Miau!',
      type: 'error',
      duration: 3000,
      position: 'top-right'
    });
  }
};

export const catBreeds = async () => {
  const url = 'https://api.thecatapi.com/v1/breeds'
  return await handleRequest(url)
}

export const catImages = async (breedId: string, page = 1, limit = 10) => {
  const url = `https://api.thecatapi.com/v1/images/search?page=${page}&limit=${limit}&breed_id=${breedId}`
  return await handleRequest(url)
}

export const catSingle = async (id: any) => {
  const url = `https://api.thecatapi.com/v1/images/${id}`
  return await handleRequest(url)
}