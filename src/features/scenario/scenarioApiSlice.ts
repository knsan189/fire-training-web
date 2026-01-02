import baseApi from "../baseApi"
import type { ExerciseType } from "../exerciseType/exerciesTypeApiSlice"
import type { Prerequisite } from "../prerequisite/prerequisiteApiSlice"
import type { TargetGroup } from "../targetGroup/targetGroupApiSlice"
import type { User } from "../user/userApiSlice"
import type { Equipment } from "../equipment/equipmentApiSlice"

export enum ScenarioInstructorRole {
  Ignition = "ignition",
  Safety = "safety",
  Main = "main",
  Assistant = "sub",
  Water = "water_supply",
}

export interface ScenarioEquipment {
  id: 1
  scenarioId: 1
  equipmentId: 1
  equipment: Equipment
  quantity: "10.00"
  unit: "개"
  isChecked: true
  note: null
}

export enum ScenarioLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface Scenario {
  id: number

  name: string

  briefDescription: string | null

  startedAt: string | null

  date: string | null

  weather: string | null

  temperature: number | null

  humidity: number | null

  duration: number | null

  exerciseTypeIds: ExerciseType["id"][]

  targetGroupIds: TargetGroup["id"][]

  prerequisiteIds: Prerequisite["id"][]

  numberOfStudents: number | null

  notes: string | null

  createdAt: Date

  updatedAt: Date

  level: ScenarioLevel | null
}

export interface ScenarioDetail extends Scenario {
  equipments: ScenarioEquipment[]

  officeInCharge: User | null

  instructors: Record<ScenarioInstructorRole, User[]>

  nozzleSettings: ScenarioNozzleSetting[]
}

export enum NozzleSettingPurpose {
  EDUCATION = "education",
  EMERGENCY = "emergency",
  SAFETY = "safety",
}

export interface ScenarioNozzleSetting {
  hoseCount: number
  pressure: number
  waterSource: string
  purpose: NozzleSettingPurpose
  note: string
}
export interface CreateScenarioRequest {
  name: string
  briefDescription?: string
  startedAt?: string
  date?: string
  weather?: string
  temperature?: number
  humidity?: number

  duration?: number

  level: ScenarioLevel

  officeInChargeId?: number

  exerciseTypeIds?: number[]

  targetGroupIds?: number[]

  prerequisiteIds?: number[]

  instructors: Record<ScenarioInstructorRole, User["id"][]>

  numberOfStudents?: number

  notes?: string

  equipments?: ScenarioEquipment[]

  nozzleSettings?: ScenarioNozzleSetting[]
}

export interface UpdateScenarioRequest extends CreateScenarioRequest {
  id: number
}

const scenarioApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getScenarios: builder.query<Scenario[], void>({
      query: () => "/scenarios",
      providesTags: ["Scenario"],
    }),
    getScenarioDetails: builder.query<ScenarioDetail, number>({
      query: id => `/scenarios/${id}`,
    }),
    createScenario: builder.mutation<Scenario, CreateScenarioRequest>({
      query: body => ({
        url: "/scenarios",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Scenario"],
    }),
    updateScenario: builder.mutation<Scenario, UpdateScenarioRequest>({
      query: ({ id, ...body }) => ({
        url: `/scenarios/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Scenario"],
    }),
  }),
})

export const {
  useGetScenariosQuery,
  useGetScenarioDetailsQuery,
  useCreateScenarioMutation,
  useUpdateScenarioMutation,
} = scenarioApiSlice

export default scenarioApiSlice
