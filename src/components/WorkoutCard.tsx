import { Workout } from '../lib/types'
import { useWorkouts } from '../lib/useWorkouts'
import { formatDistanceToNow } from 'date-fns'
import { axiosConfig } from '../lib/axios_config'
import { useUserStore } from '../lib/auth_store'

export default function WorkoutDetails({ workout }: { workout: Workout }) {
    const token = useUserStore((state) => state.user?.token)
    const { workouts, mutateWorkouts } = useWorkouts()

    const handleClick = async () => {
        const response = await axiosConfig.delete(
            '/api/workouts/' + workout._id,
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        )
        const deletedWorkout = response.data
        const newWorkouts = workouts.filter(
            (workout: Workout) => workout._id !== deletedWorkout._id
        )
        mutateWorkouts(newWorkouts, { revalidate: false })
    }

    return (
        <div className="relative mb-6 w-11/12 rounded-md bg-white p-5 drop-shadow-md">
            <h4 className="mb-2 text-lg font-bold text-emerald-500">
                {workout.title}
            </h4>
            <p className="mb-2 text-sm text-gray-800">
                <strong>Load (kg): </strong>
                {workout.load}
            </p>
            <p className="mb-2 text-sm text-gray-800">
                <strong>Reps: </strong>
                {workout.reps}
            </p>
            <p className="text-sm text-gray-800">
                {formatDistanceToNow(new Date(workout.createdAt), {
                    addSuffix: true,
                })}
            </p>
            <span
                onClick={handleClick}
                className="material-symbols-outlined absolute top-5 right-5 cursor-pointer rounded-full bg-slate-200 p-1 shadow-sm shadow-gray-500"
            >
                delete
            </span>
        </div>
    )
}
