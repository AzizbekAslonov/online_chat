// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axios";
// Define a service using a base URL and expected endpoints
export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: "/messages",
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        data,
      }),
    }),
    sendFile: builder.mutation({
      query: (data) => ({
        url: "/upload",
        method: "POST",
        data,
      }),
    }),
    like: builder.mutation({
      query: (id) => ({
        url: `/messages/like/${id}`,
        method: "PATCH",
      }),
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useSendMessageMutation,
  useSendFileMutation,
  useLikeMutation,
  useDeleteMessageMutation,
} = messageApi;
