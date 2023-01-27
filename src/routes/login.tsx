import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useUserStore } from '../lib/auth_store'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, InferType } from 'yup'
import { useNavigate } from 'react-router-dom'

const loginSchema = object({
  email: string().required().email(),
  password: string().required(),
})

type Formdata = InferType<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const login = useUserStore((state) => state.login)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Formdata>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    await login(data)
      .then(() => navigate('/'))
      .catch((err) => {
        setError(err.response.data)
        setIsLoading(false)
      })
  })

  useEffect(() => reset(), [isSubmitSuccessful])

  return (
    <div className="mt-8 w-3/4 max-w-md rounded bg-white p-7">
      <h3 className="mb-3 text-xl font-bold">Login</h3>

      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mb-3 flex flex-col">
          <label>Email:</label>
          <input
            className="mt-1 border-2 border-gray-300 px-2 py-2 drop-shadow-sm"
            type="email"
            {...register('email')}
          />
          <p className="mt-1 text-xs text-red-500">{errors.email?.message}</p>
        </div>

        <div className="mb-3 flex flex-col">
          <label>Password:</label>
          <input
            className="mt-1 border-2 border-gray-300 px-2 py-2 drop-shadow-sm"
            type="password"
            {...register('password')}
          />
          <p className="mt-1 text-xs text-red-500">
            {errors.password?.message}
          </p>
        </div>

        <button
          className="mt-3 cursor-pointer border border-black bg-white py-2 font-semibold drop-shadow-md"
          type="submit"
          disabled={isLoading}
        >
          Login
        </button>

        {error && (
          <div className="my-4 border border-red-700 bg-red-50 p-2 text-red-700">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}
