import baseApi from "../baseApi"

export interface Prerequisite {
  id: number

  name: string

  description: string | null

  isActive: boolean

  createdAt: Date

  updatedAt: Date
}

const prerequisiteApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPrerequisites: builder.query<Prerequisite[], void>({
      query: () => "/prerequisites",
    }),
  }),
})

export const { useGetPrerequisitesQuery } = prerequisiteApiSlice

export default prerequisiteApiSlice
