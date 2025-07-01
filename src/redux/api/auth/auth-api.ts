import { TResponse } from "@/lib/types";
import { baseApi } from "../base-api";

type TUser = {
  name: string;
  email: string;
  photoURL: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      TResponse<{
        accessToken: string;
        data: {
          name: string;
          email: string;
          photoURL?: string;
          _id: string;
        };
      }>,
      any
    >({
      query: (formData) => ({
        url: "/auth/login",
        method: "POST",
        data: formData,
      }),
    }),
    getSingleUser: builder.query<TResponse<TUser>, undefined>({
      query: () => ({
        url: "/users/get-user",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetSingleUserQuery } = authApi;
