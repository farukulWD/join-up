// User interface
export interface User {
  _id: string
  name: string
  email: string
  photoURL?: string
}

// Event interface - updated to match requirements
export interface Event {
  _id: string
  title: string
  name: string // who posted the event
  postedBy: {
    _id: string
    name: string
    photoURL?: string
  }
  date: string // ISO string
  time: string
  location: string
  description: string
  attendeeCount: number
  joinedUsers: string[] // track who joined
  createdAt: string
  updatedAt: string
}

// Auth state interface
export interface AuthState {
  isAuthenticated: boolean
  user: User | null
}
