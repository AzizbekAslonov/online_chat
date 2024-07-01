// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axios";
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  // tagTypes: ["users"],
  baseQuery: axiosBaseQuery({ baseUrl: "/users" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      // providesTags: ["users"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: "/" + id,
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "post",
        data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "post",
        data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "put",
        data,
      }),
      // invalidatesTags: ["users"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi;
