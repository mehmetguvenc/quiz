import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: nuxtApp.$config.public.apiBaseUrl, // Ensure this matches your runtime config or default
  });

  return {
    provide: {
      axios: instance,
    },
  };
});