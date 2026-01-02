import baseApi from "../baseApi"

export interface Equipment {
  id: number

  name: string

  description: string | null

  unit: string | null

  isActive: boolean

  createdAt: Date

  updatedAt: Date
}

export interface CreateEquipmentRequest {
  name: string
  description: string
  unit: string
  isActive: boolean
}

export interface UpdateEquipmentRequest {
  id: number
  name: string
  description: string
  unit: string
  isActive: boolean
}

export interface GetEquipmentsRequest {
  isActive?: boolean
}

const equipmentApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getEquipments: builder.query<Equipment[], GetEquipmentsRequest>({
      query: request => ({
        url: "/equipments",
        params: request,
      }),
      providesTags: ["Equipment"],
      transformResponse: (response: Equipment[]) => {
        return response.sort(a => (a.isActive ? -1 : 1))
      },
    }),
    createEquipment: builder.mutation<Equipment, CreateEquipmentRequest>({
      query: body => ({
        url: "/equipments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Equipment"],
    }),
    updateEquipment: builder.mutation<Equipment, UpdateEquipmentRequest>({
      query: ({ id, ...body }) => ({
        url: `/equipments/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Equipment"],
    }),
    deleteEquipment: builder.mutation<void, number>({
      query: id => ({
        url: `/equipments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Equipment"],
    }),
  }),
})

export const {
  useGetEquipmentsQuery,
  useCreateEquipmentMutation,
  useUpdateEquipmentMutation,
  useDeleteEquipmentMutation,
} = equipmentApiSlice
