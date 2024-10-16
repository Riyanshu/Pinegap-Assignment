import { CustomerResponse } from '@/types/customer';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customersApi = createApi({
    reducerPath: 'customersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://randomuser.me/api/' }),
    endpoints: (builder) => ({
        getCustomers: builder.query<CustomerResponse, number>({
            query: (page) => `?results=10&page=${page}`,
        }),
    }),
});

export const { useGetCustomersQuery } = customersApi;