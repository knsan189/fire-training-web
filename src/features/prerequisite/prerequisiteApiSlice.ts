import baseApi from "../baseApi"

export interface Prerequisite {
  id: number

  name: string

  description: string | null

  isActive: boolean

  createdAt: Date

  updatedAt: Date
}

export interface CreatePrerequisiteRequest {
  name: string
  description: string
  isActive: boolean
}

export interface UpdatePrerequisiteRequest {
  id: number
  name: string
  description: string
  isActive: boolean
}

export interface GetPrerequisitesRequest {
  isActive?: boolean
}

const prerequisiteApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPrerequisites: builder.query<Prerequisite[], GetPrerequisitesRequest>({
      query: request => ({
        url: "/prerequisites",
        params: request,
      }),
      providesTags: ["Prerequisite"],
      transformResponse: (response: Prerequisite[]) => {
        return response.sort(a => (a.isActive ? -1 : 1))
      },
    }),
    createPrerequisite: builder.mutation<
      Prerequisite,
      CreatePrerequisiteRequest
    >({
      query: body => ({
        url: "/prerequisites",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Prerequisite"],
    }),
    updatePrerequisite: builder.mutation<
      Prerequisite,
      UpdatePrerequisiteRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/prerequisites/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Prerequisite"],
    }),
    deletePrerequisite: builder.mutation<void, number>({
      query: id => ({
        url: `/prerequisites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prerequisite"],
    }),
  }),
})

export const {
  useGetPrerequisitesQuery,
  useCreatePrerequisiteMutation,
  useUpdatePrerequisiteMutation,
} = prerequisiteApiSlice

export default prerequisiteApiSlice
