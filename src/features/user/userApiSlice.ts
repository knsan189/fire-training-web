import baseApi from "../baseApi"

export interface User {
  id: number

  email: string

  name: string | null

  password: string | null

  role: string | null

  isActive: boolean

  notes: string | null

  createdAt: Date

  updatedAt: Date
}
export interface GetUsersRequest {
  name?: string
}

const userApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[], GetUsersRequest>({
      query: () => "/users",
    }),
    getUserDetails: builder.query<User, number>({
      query: id => `/users/${id}`,
    }),
  }),
})

export const { useGetUsersQuery } = userApiSlice

export default userApiSlice
