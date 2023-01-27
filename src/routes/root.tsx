import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Root() {
    return (
        <div className="min-h-screen bg-slate-100">
            <div className="bg-white">
                <Navbar />
            </div>

            <div className="mx-auto flex max-w-screen-xl justify-center p-7">
                <Outlet />
            </div>
        </div>
    )
}
