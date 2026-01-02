import baseApi from "../baseApi"

export interface TargetGroup {
  id: number

  name: string

  description: string | null

  isActive: boolean

  createdAt: Date

  updatedAt: Date
}

export interface CreateTargetGroupRequest {
  name: string
  description: string
  isActive: boolean
}

export interface UpdateTargetGroupRequest {
  id: number
  name: string
  description: string
  isActive: boolean
}

export interface GetTargetGroupsRequest {
  isActive?: boolean
}

const targetGroupApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTargetGroups: builder.query<TargetGroup[], GetTargetGroupsRequest>({
      query: request => ({
        url: "/target-groups",
        params: request,
      }),
      providesTags: ["TargetGroup"],
      transformResponse: (response: TargetGroup[]) => {
        return response.sort(a => (a.isActive ? -1 : 1))
      },
    }),
    createTargetGroup: builder.mutation<TargetGroup, CreateTargetGroupRequest>({
      query: body => ({
        url: "/target-groups",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TargetGroup"],
    }),
    updateTargetGroup: builder.mutation<TargetGroup, UpdateTargetGroupRequest>({
      query: ({ id, ...body }) => ({
        url: `/target-groups/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TargetGroup"],
    }),
    deleteTargetGroup: builder.mutation<void, number>({
      query: id => ({
        url: `/target-groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TargetGroup"],
    }),
  }),
})

export const {
  useGetTargetGroupsQuery,
  useCreateTargetGroupMutation,
  useUpdateTargetGroupMutation,
  useDeleteTargetGroupMutation,
} = targetGroupApiSlice
