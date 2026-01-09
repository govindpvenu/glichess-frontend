import { apiSlice } from "./apiSlice"

const USER_URL = "/api/user"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: `${USER_URL}/get-all-users`,
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/update-user`,
                method: "PATCH",
                body: data,
            }),
        }),
    }),
})

export const { useGetAllUsersQuery, useUpdateUserMutation } = usersApiSlice
