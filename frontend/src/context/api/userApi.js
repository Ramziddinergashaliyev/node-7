import { api } from "./index";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: ["User"],
    }),
    getUsersById: build.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      providesTags: ["User"],
    }),
    createUsers: build.mutation({
      query: (body) => ({
        url: "/users/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    SignInUsers: build.mutation({
      query: (body) => ({
        url: "/users/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUsers: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUsers: build.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUsersMutation,
  useSignInUsersMutation,
  useCreateUsersMutation,
  useUpdateUsersMutation,
} = userApi;
