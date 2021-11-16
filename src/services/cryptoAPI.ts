import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '3bdb5806a4msh225ef6601b98fe8p12b372jsn06032a7e8cbe',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: builder => ({
    getCryptos: builder.query({
      query: count => createRequest(`/coins?limit=${count}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;

// const options = {
//   baseURL: 'https://coinranking1.p.rapidapi.com/coins',
//   headers: {
//     'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//     'x-rapidapi-key': '3bdb5806a4msh225ef6601b98fe8p12b372jsn06032a7e8cbe',
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log('axios');

//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
