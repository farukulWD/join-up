// Placeholder for internationalization
// This would be configured with next-intl or react-i18next

export const translations = {
  en: {
    nav: {
      home: "Home",
      events: "Events",
      addEvent: "Add Event",
      myEvents: "My Events",
      signIn: "Sign In",
      logout: "Logout",
    },
    home: {
      heroTitle: "Discover Amazing Events",
      heroSubtitle: "Connect with your community and join exciting events happening around you",
      exploreEvents: "Explore Events",
      createEvent: "Create Event",
      upcomingEvents: "Upcoming Events",
    },
    events: {
      searchPlaceholder: "Search events...",
      filterBy: "Filter by",
      today: "Today",
      thisWeek: "This Week",
      lastWeek: "Last Week",
      thisMonth: "This Month",
      lastMonth: "Last Month",
      join: "Join",
      attendees: "attendees",
    },
    addEvent: {
      title: "Create New Event",
      eventTitle: "Event Title",
      date: "Date",
      time: "Time",
      location: "Location",
      description: "Description",
      addEvent: "Add Event",
    },
    myEvents: {
      title: "My Events",
      update: "Update",
      delete: "Delete",
      noEvents: "You haven't created any events yet.",
    },
    auth: {
      signIn: "Sign In",
      signUp: "Sign Up",
      email: "Email",
      password: "Password",
      name: "Full Name",
      photoURL: "Photo URL (optional)",
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
    },
  },
}

export const t = (key: string) => {
  const keys = key.split(".")
  let value: any = translations.en

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
