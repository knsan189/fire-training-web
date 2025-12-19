import baseApi from "../baseApi"

export interface ExerciseType {
  id: number

  name: string

  description: string | null

  isActive: boolean

  createdAt: Date

  updatedAt: Date
}

const exerciseTypeApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getExerciseTypes: builder.query<ExerciseType[], void>({
      query: () => "/exercise-types",
    }),
  }),
})

export const { useGetExerciseTypesQuery } = exerciseTypeApiSlice
