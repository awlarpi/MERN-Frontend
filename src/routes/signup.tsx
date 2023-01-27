import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useUserStore } from '../lib/auth_store'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, InferType } from 'yup'
import { useNavigate } from 'react-router-dom'

const signupSchema = object({
  email: string().required().email().trim(),
  password: string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%&])[a-zA-Z\d!@#%&]{8,}$/,
      {
        message:
          'password must contain at least one lowercase letter, one uppercase letter, one number and one symbol, and must have a minimum length of 8 characters',
        excludeEmptyString: true,
      }
    ),
})

type Formdata = InferType<typeof signupSchema>

export default function SignupPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const signup = useUserStore((state) => state.signup)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Formdata>({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    await signup(data)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err.response.data)
      })
  })

  useEffect(() => reset(), [isSubmitSuccessful])

  return (
    <div className="mt-8 w-3/4 max-w-md rounded bg-white p-7">
      <h3 className="mb-3 text-xl font-bold">Sign Up</h3>

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
          Sign Up
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
