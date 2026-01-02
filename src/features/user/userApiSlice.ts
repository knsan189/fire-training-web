import baseApi from "../baseApi"

export enum UserRole {
  Admin = "admin",
  Instructor = "instructor",
}

export const userRoleLabels: Record<UserRole, string> = {
  [UserRole.Admin]: "관리자",
  [UserRole.Instructor]: "감독관",
}

export interface User {
  id: number

  email: string

  name: string | null

  password: string | null

  role: UserRole | null

  isActive: boolean

  notes: string | null

  createdAt: Date

  updatedAt: Date
}
export interface GetUsersRequest {
  name?: string
  isActive?: boolean
}

export interface CreateUserRequest {
  name?: string
  email: string
  password?: string
  role?: UserRole
  isActive?: boolean
  notes?: string
}

export interface UpdateUserRequest extends CreateUserRequest {
  id: number
}

const userApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[], GetUsersRequest>({
      query: request => ({
        url: "/users",
        params: request,
      }),
      providesTags: ["User"],
    }),
    getUserDetails: builder.query<User, number>({
      query: id => `/users/${id}`,
      providesTags: ["User"],
    }),
    createUser: builder.mutation<User, CreateUserRequest>({
      query: user => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, ...user }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: id => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice

export default userApiSlice
