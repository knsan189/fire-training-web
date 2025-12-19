import baseApi from "../baseApi"
import type { ExerciseType } from "../exerciseType/exerciesTypeApiSlice"
import type { Prerequisite } from "../prerequisite/prerequisiteApiSlice"
import type { TargetGroup } from "../targetGroup/targetGroupApiSlice"
import type { User } from "../user/userApiSlice"

export interface Scenario {
  id: number

  name: string

  briefDescription: string | null

  startedAt: Date | null

  date: Date | null

  weather: string | null

  temperature: number | null

  humidity: number | null

  duration: number | null

  officeInCharge: User | null

  exerciseTypeIds: ExerciseType["id"][]

  targetGroupIds: TargetGroup["id"][]

  prerequisiteIds: Prerequisite["id"][]

  numberOfStudents: number | null

  notes: string | null

  createdAt: Date

  updatedAt: Date
}

const scenarioApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getScenarios: builder.query<Scenario[], void>({
      query: () => "/scenarios",
    }),
    getScenarioDetails: builder.query<Scenario, number>({
      query: id => `/scenarios/${id}`,
    }),
  }),
})

export const { useGetScenariosQuery, useGetScenarioDetailsQuery } =
  scenarioApiSlice

export default scenarioApiSlice
