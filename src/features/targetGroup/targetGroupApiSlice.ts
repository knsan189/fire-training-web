import baseApi from "../baseApi"

export interface TargetGroup {
  id: number

  name: string

  description: string | null

  isActive: boolean

  createdAt: Date

  updatedAt: Date
}

const targetGroupApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTargetGroups: builder.query<TargetGroup[], void>({
      query: () => "/target-groups",
    }),
  }),
})

export const { useGetTargetGroupsQuery } = targetGroupApiSlice
