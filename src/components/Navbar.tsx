import { Link } from 'react-router-dom'
import { useUserStore } from '../lib/auth_store'

export default function Navbar() {
    const logout = useUserStore((state) => state.logout)
    const user = useUserStore((state) => state.user)

    return (
        <nav className="mx-auto my-0 flex max-w-screen-xl flex-row items-center justify-between py-10 px-5">
            <Link to="/" className="text-4xl font-bold text-gray-800">
                Workout Buddy
            </Link>

            {!user ? (
                <div className="flex items-center justify-center">
                    <Link to="/login" className="ml-5">
                        Login
                    </Link>
                    <Link to="/signup" className="ml-5">
                        Signup
                    </Link>
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <header>{user.email}</header>
                    <Link
                        to="/login"
                        className="ml-5 rounded-md border-2 border-emerald-400 py-1 px-2 text-emerald-600"
                        onClick={logout}
                    >
                        Logout
                    </Link>
                </div>
            )}
        </nav>
    )
}
