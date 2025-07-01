import type { Event, User } from "./types";

// Mock current user
export const mockCurrentUser: User = {
  _id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  photoURL: "/placeholder.svg?height=40&width=40",
};

// Mock users
export const mockUsers: User[] = [
  mockCurrentUser,
  {
    _id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    photoURL: "/placeholder.svg?height=40&width=40",
  },
  {
    _id: "user-3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    photoURL: "/placeholder.svg?height=40&width=40",
  },
];

// Mock events - sorted by date/time descending (most recent first)
export const mockEvents: Event[] = [
  {
    _id: "event-1",
    title: "Tech Conference 2024",
    name: "Jane Smith", // who posted the event
    postedBy: {
      _id: "user-2",
      name: "Jane Smith",
      photoURL: "/placeholder.svg?height=40&width=40",
    },
    date: "2024-02-25",
    time: "09:00",
    location: "San Francisco Convention Center",
    description:
      "Join us for the biggest tech conference of the year featuring keynotes from industry leaders, networking opportunities, and hands-on workshops.",
    attendeeCount: 0,
    joinedUsers: [],
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    _id: "event-2",
    title: "Community Yoga Session",
    name: "Mike Johnson",
    postedBy: {
      _id: "user-3",
      name: "Mike Johnson",
      photoURL: "/placeholder.svg?height=40&width=40",
    },
    date: "2024-02-20",
    time: "07:00",
    location: "Central Park",
    description:
      "Start your morning with a peaceful yoga session in the park. All levels welcome! Bring your own mat.",
    attendeeCount: 0,
    joinedUsers: [],
    createdAt: "2024-01-15T15:30:00Z",
    updatedAt: "2024-01-15T15:30:00Z",
  },
  {
    _id: "event-3",
    title: "Startup Networking Mixer",
    name: "John Doe",
    postedBy: {
      _id: "user-1",
      name: "John Doe",
      photoURL: "/placeholder.svg?height=40&width=40",
    },
    date: "2024-02-15",
    time: "18:00",
    location: "WeWork Downtown",
    description:
      "Connect with fellow entrepreneurs, investors, and startup enthusiasts. Light refreshments provided.",
    attendeeCount: 0,
    joinedUsers: [],
    createdAt: "2024-01-12T09:15:00Z",
    updatedAt: "2024-01-12T09:15:00Z",
  },
  {
    _id: "event-4",
    title: "Photography Workshop",
    name: "Jane Smith",
    postedBy: {
      _id: "user-2",
      name: "Jane Smith",
      photoURL: "/placeholder.svg?height=40&width=40",
    },
    date: "2024-02-10",
    time: "14:00",
    location: "Art Studio Downtown",
    description:
      "Learn professional photography techniques from award-winning photographers. Camera equipment provided.",
    attendeeCount: 0,
    joinedUsers: [],
    createdAt: "2024-01-08T11:45:00Z",
    updatedAt: "2024-01-08T11:45:00Z",
  },
];

// Mock auth state
export const mockAuthState = {
  isAuthenticated: true,
  user: mockCurrentUser,
};
