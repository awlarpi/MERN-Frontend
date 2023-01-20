import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Root() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="bg-white">
        <Navbar />
      </div>

      <div className="mx-auto max-w-screen-xl p-7">
        <Outlet />
      </div>
    </div>
  )
}
