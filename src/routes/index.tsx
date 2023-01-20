import type { Workout } from "../lib/types"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkouts } from "../lib/hooks"

export default function Index() {
  const { workouts, isLoading, error } = useWorkouts()

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className="container my-3 grid grid-cols-4">
      <div className="container col-span-3 ">
        {workouts &&
          workouts.map((workout: Workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <div className="container col-span-1">
        <WorkoutForm />
      </div>
    </div>
  )
}
