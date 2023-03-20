import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Products {
  products: [
    {
      id?: number;
      title?: string;
      description?: string;
      price?: number;
      discountPercentage?: number;
      rating?: number;
      stock?: number;
      brand?: string;
      category?: string;
      thumbnail?: string;
      images?: [string];
    }
  ];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  endpoints: (build) => ({
    getAllProducts: build.query<Products, string>({
      query: () => '/products',
    }),
  }),
});

// export const { useGetAllProductsQuery } = api;
