import baseApi from "../baseApi"

export interface Fuel {
  id: number
  name: string
  category: string
  description: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const fuelApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFuels: builder.query<Fuel[], void>({
      query: () => "/fuels",
    }),
  }),
})

export const { useGetFuelsQuery } = fuelApiSlice
