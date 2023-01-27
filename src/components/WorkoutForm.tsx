import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useWorkouts } from '../lib/useWorkouts'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { axiosConfig } from '../lib/axios_config'
import { useUserStore } from '../lib/auth_store'

const schema = yup.object({
    title: yup.string().required('Excercise name is required'),
    load: yup
        .number()
        .typeError('Load must be a number')
        .positive('Load must be greater than zero'),
    reps: yup
        .number()
        .typeError('Reps must be a number')
        .integer('Reps must be an integer')
        .positive('Reps must be greater than zero'),
})

type Formdata = yup.InferType<typeof schema>

export default function App() {
    const token = useUserStore((state) => state.user?.token)
    const [error, setError] = useState<string | null>(null)
    const { workouts, mutateWorkouts } = useWorkouts()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<Formdata>({
        resolver: yupResolver(schema),
    })

    useEffect(() => reset(), [isSubmitSuccessful])

    const onSubmit = handleSubmit(async (data) => {
        const submittedWorkout = await axiosConfig
            .post('/api/workouts', data, {
                headers: { Authorization: 'Bearer ' + token },
            })
            .then((res) => res.data)
            .catch((err) => {
                setError(err.response.data.error)
                console.error(err.response.data.error)
            })
        const newWorkouts = [submittedWorkout, ...workouts]
        mutateWorkouts(newWorkouts, { revalidate: false })
        setError(null)
    })

    return (
        <>
            <h3 className="mb-3 text-lg font-bold">Add a New Workout</h3>

            <form className="flex flex-col" onSubmit={onSubmit}>
                <div className="mb-3 flex flex-col">
                    <label>Title:</label>
                    <input
                        className="mt-1 px-2 py-2 drop-shadow-md"
                        type="text"
                        {...register('title')}
                    />
                    <p className="mt-1 text-xs text-red-500">
                        {errors.title?.message}
                    </p>
                </div>

                <div className="mb-3 flex flex-col">
                    <label>Load:</label>
                    <input
                        className="mt-1 px-2 py-2 drop-shadow-md"
                        type="number"
                        {...register('load')}
                    />
                    <p className="mt-1 text-xs text-red-500">
                        {errors.load?.message}
                    </p>
                </div>

                <div className="mb-3 flex flex-col">
                    <label>Reps:</label>
                    <input
                        className="mt-1 px-2 py-2 drop-shadow-md"
                        type="number"
                        {...register('reps')}
                    />
                    <p className="mt-1 text-xs text-red-500">
                        {errors.reps?.message}
                    </p>
                </div>

                <input
                    className="mt-3 cursor-pointer border border-black bg-white py-1 drop-shadow"
                    type="submit"
                />

                {error && (
                    <div className="my-4 border border-red-700 bg-red-100 p-2 text-center text-red-700">
                        {error}
                    </div>
                )}
            </form>
        </>
    )
}
