import useSWR from 'swr'
import { axiosConfig } from './axios_config'
import { useUserStore } from './auth_store'

const fetcher = (path: string, token: string | undefined) =>
    axiosConfig
        .get(path, {
            headers: { Authorization: 'Bearer ' + token },
        })
        .then((res) => res.data)

export function useWorkouts() {
    const token = useUserStore((state) => state.user?.token)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/workouts', token],
        ([path, token]) => fetcher(path, token)
    )

    return {
        workouts: data,
        isLoading,
        error,
        mutateWorkouts: mutate,
    }
}
