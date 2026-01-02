import baseApi from "../baseApi"

export interface ExerciseType {
  id: number

  name: string

  description: string | null

  isActive: boolean

  createdAt: Date

  updatedAt: Date
}

export interface CreateExerciseTypeRequest {
  name: string
  description: string
  isActive: boolean
}

export interface UpdateExerciseTypeRequest {
  id: number
  name: string
  description: string
  isActive: boolean
}

export interface GetExerciseTypesRequest {
  isActive?: boolean
}

const exerciseTypeApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getExerciseTypes: builder.query<ExerciseType[], GetExerciseTypesRequest>({
      query: request => ({
        url: "/exercise-types",
        params: request,
      }),
      providesTags: ["ExerciseType"],
      transformResponse: (response: ExerciseType[]) => {
        return response.sort(a => (a.isActive ? -1 : 1))
      },
    }),
    createExerciseType: builder.mutation<
      ExerciseType,
      CreateExerciseTypeRequest
    >({
      query: body => ({
        url: "/exercise-types",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ExerciseType"],
    }),
    updateExerciseType: builder.mutation<
      ExerciseType,
      UpdateExerciseTypeRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/exercise-types/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ExerciseType"],
    }),
    deleteExerciseType: builder.mutation<void, number>({
      query: id => ({
        url: `/exercise-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExerciseType"],
    }),
  }),
})

export const {
  useGetExerciseTypesQuery,
  useCreateExerciseTypeMutation,
  useUpdateExerciseTypeMutation,
  useDeleteExerciseTypeMutation,
} = exerciseTypeApiSlice
