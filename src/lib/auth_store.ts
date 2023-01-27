import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { axiosConfig } from './axios_config'

interface UserCredentials {
  email: string
  password: string
}

interface UserState {
  user: { email: string; token: string } | null
  signup: (credentials: UserCredentials) => Promise<void>
  login: (credentials: UserCredentials) => Promise<void>
  logout: () => void
  deleteAccount: (password: string) => Promise<void>
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: { email: '', token: '' },
      signup: async (credentials) => {
        const res = await axiosConfig.post('/api/user/signup', credentials)
        set({ user: res.data })
      },
      login: async (credentials) => {
        const res = await axiosConfig.post('/api/user/login', credentials)
        set({ user: res.data })
      },
      logout: () => {
        set({ user: null })
      },
      deleteAccount: async (password) => {
        const token = get().user?.token
        if (!token) return

        await axiosConfig.post(
          '/api/user/delete',
          { password },
          {
            headers: { Authorization: 'Bearer ' + token },
          }
        )
        set({ user: null })
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
