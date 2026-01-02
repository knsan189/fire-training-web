import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl =
  import.meta.env.NODE_ENV === "production"
    ? "https://fire-api.haneul.app"
    : "http://localhost:3000"

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => ({}),
  tagTypes: ["Scenario", "User", "TargetGroup", "Prerequisite", "ExerciseType"],
})

export default baseApi
