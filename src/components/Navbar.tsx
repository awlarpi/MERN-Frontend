import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header className="mx-auto my-0 flex max-w-screen-xl items-center justify-between py-10 px-5 font-bold">
      <Link to="/">
        <h1 className="text-4xl text-gray-800">Workout Buddy</h1>
      </Link>
    </header>
  )
}
