import axios from "axios"
import useSWRImmutable from "swr/immutable"

const fetcher = (url: string) => axios.get(url).then((r) => r.data)

export function useWorkouts() {
  const url = "http://192.168.1.178:4000/api/workouts/"
  const { data, error, isLoading, mutate } = useSWRImmutable(url, fetcher)
  return {
    workouts: data,
    isLoading,
    error,
    workoutsURL: url,
    mutateWorkouts: mutate,
  }
}
