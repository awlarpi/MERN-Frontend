import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { useWorkouts } from "../lib/hooks"
import axios from "axios"

type FormData = {
  title: string
  load: number
  reps: number
}

export default function App() {
  const [error, setError] = useState(null)
  const { workouts, workoutsURL, mutateWorkouts } = useWorkouts()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (data: FormData) => {
    const submittedWorkout = await axios
      .post(workoutsURL, data)
      .then((res) => res.data)
      .catch((err) => {
        setError(err.response.data.error)
        console.error(err.response.data.error)
      })
    const newWorkouts = [submittedWorkout, ...workouts]
    mutateWorkouts(newWorkouts, { revalidate: false })
    setError(null)
  })

  useEffect(() => reset(), [isSubmitSuccessful])

  return (
    <div>
      <h3 className="mb-3 text-lg font-bold">Add a New Workout</h3>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mb-3 flex flex-col">
          <label>Title:</label>

          <input
            className="mt-1 px-2 py-2 drop-shadow-md"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors.load && (
            <p className="mt-1 text-xs text-red-500">Enter exercise name.</p>
          )}
        </div>

        <div className="mb-3 flex flex-col">
          <label>Load:</label>
          <input
            className="mt-1 px-2 py-2 drop-shadow-md"
            placeholder="Load"
            {...register("load", { pattern: /\d+/, required: true })}
          />
          {errors.load && (
            <p className="mt-1 text-xs text-red-500">Enter load in kgs.</p>
          )}
        </div>

        <div className="mb-3 flex flex-col">
          <label>Reps:</label>
          <input
            className="mt-1 px-2 py-2 drop-shadow-md"
            placeholder="Reps"
            {...register("reps", { pattern: /\d+/, required: true })}
          />
          {errors.reps && (
            <p className="mt-1 text-xs text-red-500">Enter number of reps.</p>
          )}
        </div>

        <input
          className="mt-3 cursor-pointer border border-green-400 bg-white py-1 font-mono font-semibold drop-shadow"
          type="submit"
        />

        {error && (
          <div className="my-2 border-4 border-red-700 bg-slate-200 p-2 text-red-700">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}
