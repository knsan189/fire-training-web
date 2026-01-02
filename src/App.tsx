import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ScenarioListPage from "./pages/scenario/ScenarioListPage"
import ScenarioDetailPage from "./pages/scenario/ScenarioDetailPage"
import UserListPage from "./pages/user/UserListPage"
import UserDetailPage from "./pages/user/UserDetailPage"
import LayoutOutlet from "./features/layout/components/LayoutOutlet"
import SettingPage from "./pages/SettingPage"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutOutlet />}>
          <Route path="/" element={<Home />} />
          <Route path="/scenario" element={<ScenarioListPage />} />
          <Route path="/scenario/:id" element={<ScenarioDetailPage />} />
          <Route path="/user" element={<UserListPage />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
