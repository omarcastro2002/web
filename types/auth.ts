export type UserRole = 'admin' | 'kitchen' | 'customer'

export interface User {
  id: string
  username: string
  role: UserRole
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

