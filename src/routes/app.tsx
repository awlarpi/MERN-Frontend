import Navbar from '../components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './login'
import SignupPage from './signup'
import Index from './index'
import { useUserStore } from '../lib/auth_store'

export default function App() {
  const user = useUserStore((state) => state.user)
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-white">
        <Navbar />
      </div>
      <div className="mx-auto flex max-w-screen-xl justify-center p-7">
        <Routes>
          <Route
            path="/"
            element={user ? <Index /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          ></Route>
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignupPage />}
          ></Route>
        </Routes>
      </div>
    </div>
  )
}
