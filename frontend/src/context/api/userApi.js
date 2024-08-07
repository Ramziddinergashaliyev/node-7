import { api } from "./index";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({
        url: "/api/users",
        params,
      }),
      providesTags: ["User"],
    }),
    getProfile: build.query({
      query: (params) => ({
        url: "/api/profile",
        params,
      }),
      providesTags: ["User"],
    }),
    // getUsersById: build.query({
    //   query: (id) => ({
    //     url: `/users/${id}`,
    //   }),
    //   providesTags: ["User"],
    // }),
    createUsers: build.mutation({
      query: (body) => ({
        url: "/api/users/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    SignInUsers: build.mutation({
      query: (body) => ({
        url: "/api/users/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUsers: build.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUsers: build.mutation({
      query: ({ id, body }) => ({
        url: `/api/users/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: build.mutation({
      query: ({ id, body }) => ({
        url: `/api/updeteProfile/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetProfileQuery,
  useDeleteUsersMutation,
  useSignInUsersMutation,
  useCreateUsersMutation,
  useUpdateUsersMutation,
} = userApi;
