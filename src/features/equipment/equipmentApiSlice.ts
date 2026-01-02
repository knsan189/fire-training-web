import baseApi from "../baseApi"

export interface Equipment {
  id: number

  name: string

  category: string | null

  description: string | null

  isActive: boolean

  createdAt: Date

  updatedAt: Date
}

const equipmentApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getEquipments: builder.query<Equipment[], void>({
      query: () => "/equipments",
    }),
  }),
})

export const { useGetEquipmentsQuery } = equipmentApiSlice
