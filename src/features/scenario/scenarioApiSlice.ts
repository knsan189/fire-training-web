import baseApi from "../baseApi"
import type { ExerciseType } from "../exerciseType/exerciesTypeApiSlice"
import type { Prerequisite } from "../prerequisite/prerequisiteApiSlice"
import type { TargetGroup } from "../targetGroup/targetGroupApiSlice"
import type { User } from "../user/userApiSlice"

export interface Instructor {
  id: number

  scenarioId: number

  role: string

  userId: number

  user: User
}
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

// API 응답 타입 (instructorsByRole 없음)
export interface ScenarioDetailResponse extends Scenario {
  officeInCharge: User

  instructors: Instructor[]
}

// 클라이언트에서 사용하는 타입 (instructorsByRole 포함)
export interface ScenarioDetail extends ScenarioDetailResponse {
  // 역할별로 그룹화된 교관들
  instructorsByRole: {
    ignition: User[]
    safety: User[]
    main: User[]
    assistant: User[]
    water: User[]
  }
}

const scenarioApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getScenarios: builder.query<Scenario[], void>({
      query: () => "/scenarios",
    }),
    getScenarioDetails: builder.query<ScenarioDetail, number>({
      query: id => `/scenarios/${id}`,
      transformResponse: (response: ScenarioDetailResponse): ScenarioDetail => {
        // instructors 배열을 역할별로 그룹화
        const instructorsByRole = {
          ignition: [] as User[],
          safety: [] as User[],
          main: [] as User[],
          assistant: [] as User[],
          water: [] as User[],
        }

        response.instructors?.forEach(instructor => {
          const role = instructor.role.toLowerCase()
          if (role in instructorsByRole) {
            instructorsByRole[role as keyof typeof instructorsByRole].push(
              instructor.user,
            )
          }
        })

        return {
          ...response,
          instructorsByRole,
        }
      },
    }),
  }),
})

export const { useGetScenariosQuery, useGetScenarioDetailsQuery } =
  scenarioApiSlice

export default scenarioApiSlice
