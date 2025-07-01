import { TResponse } from "@/lib/types";
import { baseApi } from "../base-api";
import { TUser } from "@/redux/features/auth-slice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      TResponse<{
        accessToken: string;
        user: TUser;
      }>,
      { email: string; password: string }
    >({
      query: (loginData) => ({
        url: "auth/sign-in",
        method: "POST",
        data: loginData,
      }),
    }),

    signUp: builder.mutation<TResponse<TUser>, Partial<TUser>>({
      query: (userData) => ({
        url: "users/sign-up",
        method: "POST",
        data: userData,
      }),
    }),
    logout: builder.mutation<TResponse<{}>, void>({
      query: () => ({
        url: "auth/sign-out",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useLogoutMutation } =
  authApi;
