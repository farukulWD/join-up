"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es" | "fr" | "de"

interface I18nContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      events: "Events",
      addEvent: "Add Event",
      myEvents: "My Event",
      signIn: "Sign In",
      logout: "Logout",
    },
    // Theme
    theme: {
      toggle: "Toggle theme",
      light: "Light",
      dark: "Dark",
      system: "System",
    },
    // Language
    language: {
      toggle: "Change language",
      english: "English",
      spanish: "Español",
      french: "Français",
      german: "Deutsch",
    },
    // Home page
    home: {
      heroTitle: "Discover Amazing Events",
      heroSubtitle: "Join exciting events in your community and create memorable experiences with like-minded people",
      browseEvents: "Browse Events",
      createEvent: "Create Event",
      upcomingEvents: "Upcoming Events",
      viewAllEvents: "View All Events",
      noUpcomingEvents: "No upcoming events",
      beFirstToCreate: "Be the first to create an event in your community!",
      features: {
        easyCreation: "Easy Event Creation",
        easyCreationDesc:
          "Create and manage your events with our intuitive interface. Share your passion with the community.",
        joinConnect: "Join & Connect",
        joinConnectDesc: "Discover events that match your interests and connect with people who share your passions.",
        localCommunity: "Local Community",
        localCommunityDesc: "Find events happening in your area and become an active part of your local community.",
      },
      stats: {
        totalEvents: "Total Events",
        activeEvents: "Active events available",
        totalAttendees: "Total Attendees",
        peopleJoining: "People joining events",
        thisMonth: "This Month",
        upcomingEvents: "Upcoming events",
      },
    },
    // Events page
    events: {
      title: "Events",
      subtitle: "Discover and join amazing events in your community",
      searchPlaceholder: "Search events by title...",
      filterByDate: "Filter by date",
      allEvents: "All Events",
      today: "Today",
      currentWeek: "Current Week",
      lastWeek: "Last Week",
      currentMonth: "Current Month",
      lastMonth: "Last Month",
      joinEvent: "Join Event",
      alreadyJoined: "Already Joined",
      noEventsFound: "No events found",
      adjustFilters: "Try adjusting your search terms or filters.",
    },
    // Add Event page
    addEvent: {
      title: "Add Event",
      subtitle: "Create a new event and share it with the community.",
      eventDetails: "Event Details",
      eventTitle: "Event Title",
      eventTitlePlaceholder: "Enter event title",
      name: "Name (who posted the Event)",
      namePlaceholder: "Your name",
      date: "Date",
      time: "Time",
      location: "Location",
      locationPlaceholder: "Enter event location",
      description: "Description",
      descriptionPlaceholder: "Describe your event...",
      attendeeCount: "AttendeeCount",
      addEventButton: "Add Event",
      addingEvent: "Adding Event...",
      cancel: "Cancel",
    },
    // My Events page
    myEvents: {
      title: "My Event",
      subtitle: "Manage the events you've created",
      addEvent: "Add Event",
      noEventsYet: "You haven't created any events yet",
      createFirstEvent: "Start by creating your first event to bring people together.",
      createYourFirstEvent: "Create Your First Event",
      update: "Update",
      delete: "Delete",
      deleteConfirmTitle: "Are you sure?",
      deleteConfirmDesc:
        "This action cannot be undone. This will permanently delete the event and remove all associated data.",
      deleteEvent: "Delete Event",
      updateEvent: "Update Event",
      updateEventDesc: "Update form would go here. In a real application, this would contain the event update form.",
    },
    // Authentication
    auth: {
      welcomeBack: "Welcome back",
      signInSubtitle: "Sign in to your EventHub account",
      signIn: "Sign In",
      signUp: "Sign Up",
      createAccount: "Create your account",
      signUpSubtitle: "Join EventHub and start discovering events",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      createPassword: "Create a password",
      name: "Name",
      namePlaceholder: "Enter your full name",
      photoURL: "PhotoURL",
      photoURLPlaceholder: "https://example.com/photo.jpg (optional)",
      signingIn: "Signing in...",
      creatingAccount: "Creating account...",
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
      allFieldsRequired: "All fields are required",
      nameEmailPasswordRequired: "Name, email, and password are required",
      demoCredentials: "Demo Credentials:",
    },
    // Private Route
    privateRoute: {
      accessRestricted: "Access Restricted",
      signInRequired: "You need to be signed in to access this page.",
      createAccount: "Create Account",
    },
    // Common
    common: {
      loading: "Loading...",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      update: "Update",
      create: "Create",
      search: "Search",
      filter: "Filter",
      by: "by",
      attendees: "attendees",
    },
  },
  es: {
    // Navigation
    nav: {
      home: "Inicio",
      events: "Eventos",
      addEvent: "Agregar Evento",
      myEvents: "Mis Eventos",
      signIn: "Iniciar Sesión",
      logout: "Cerrar Sesión",
    },
    // Theme
    theme: {
      toggle: "Cambiar tema",
      light: "Claro",
      dark: "Oscuro",
      system: "Sistema",
    },
    // Language
    language: {
      toggle: "Cambiar idioma",
      english: "English",
      spanish: "Español",
      french: "Français",
      german: "Deutsch",
    },
    // Home page
    home: {
      heroTitle: "Descubre Eventos Increíbles",
      heroSubtitle: "Únete a eventos emocionantes en tu comunidad y crea experiencias memorables con personas afines",
      browseEvents: "Explorar Eventos",
      createEvent: "Crear Evento",
      upcomingEvents: "Próximos Eventos",
      viewAllEvents: "Ver Todos los Eventos",
      noUpcomingEvents: "No hay eventos próximos",
      beFirstToCreate: "¡Sé el primero en crear un evento en tu comunidad!",
      features: {
        easyCreation: "Creación Fácil de Eventos",
        easyCreationDesc:
          "Crea y gestiona tus eventos con nuestra interfaz intuitiva. Comparte tu pasión con la comunidad.",
        joinConnect: "Únete y Conecta",
        joinConnectDesc:
          "Descubre eventos que coincidan con tus intereses y conecta con personas que comparten tus pasiones.",
        localCommunity: "Comunidad Local",
        localCommunityDesc:
          "Encuentra eventos que ocurren en tu área y conviértete en una parte activa de tu comunidad local.",
      },
      stats: {
        totalEvents: "Total de Eventos",
        activeEvents: "Eventos activos disponibles",
        totalAttendees: "Total de Asistentes",
        peopleJoining: "Personas uniéndose a eventos",
        thisMonth: "Este Mes",
        upcomingEvents: "Próximos eventos",
      },
    },
    // Events page
    events: {
      title: "Eventos",
      subtitle: "Descubre y únete a eventos increíbles en tu comunidad",
      searchPlaceholder: "Buscar eventos por título...",
      filterByDate: "Filtrar por fecha",
      allEvents: "Todos los Eventos",
      today: "Hoy",
      currentWeek: "Semana Actual",
      lastWeek: "Semana Pasada",
      currentMonth: "Mes Actual",
      lastMonth: "Mes Pasado",
      joinEvent: "Unirse al Evento",
      alreadyJoined: "Ya Unido",
      noEventsFound: "No se encontraron eventos",
      adjustFilters: "Intenta ajustar tus términos de búsqueda o filtros.",
    },
    // Add Event page
    addEvent: {
      title: "Agregar Evento",
      subtitle: "Crea un nuevo evento y compártelo con la comunidad.",
      eventDetails: "Detalles del Evento",
      eventTitle: "Título del Evento",
      eventTitlePlaceholder: "Ingresa el título del evento",
      name: "Nombre (quien publicó el Evento)",
      namePlaceholder: "Tu nombre",
      date: "Fecha",
      time: "Hora",
      location: "Ubicación",
      locationPlaceholder: "Ingresa la ubicación del evento",
      description: "Descripción",
      descriptionPlaceholder: "Describe tu evento...",
      attendeeCount: "Número de Asistentes",
      addEventButton: "Agregar Evento",
      addingEvent: "Agregando Evento...",
      cancel: "Cancelar",
    },
    // My Events page
    myEvents: {
      title: "Mis Eventos",
      subtitle: "Gestiona los eventos que has creado",
      addEvent: "Agregar Evento",
      noEventsYet: "Aún no has creado ningún evento",
      createFirstEvent: "Comienza creando tu primer evento para reunir a las personas.",
      createYourFirstEvent: "Crea Tu Primer Evento",
      update: "Actualizar",
      delete: "Eliminar",
      deleteConfirmTitle: "¿Estás seguro?",
      deleteConfirmDesc:
        "Esta acción no se puede deshacer. Esto eliminará permanentemente el evento y todos los datos asociados.",
      deleteEvent: "Eliminar Evento",
      updateEvent: "Actualizar Evento",
      updateEventDesc:
        "El formulario de actualización iría aquí. En una aplicación real, esto contendría el formulario de actualización del evento.",
    },
    // Authentication
    auth: {
      welcomeBack: "Bienvenido de vuelta",
      signInSubtitle: "Inicia sesión en tu cuenta de EventHub",
      signIn: "Iniciar Sesión",
      signUp: "Registrarse",
      createAccount: "Crea tu cuenta",
      signUpSubtitle: "Únete a EventHub y comienza a descubrir eventos",
      email: "Correo Electrónico",
      emailPlaceholder: "Ingresa tu correo electrónico",
      password: "Contraseña",
      passwordPlaceholder: "Ingresa tu contraseña",
      createPassword: "Crea una contraseña",
      name: "Nombre",
      namePlaceholder: "Ingresa tu nombre completo",
      photoURL: "URL de Foto",
      photoURLPlaceholder: "https://ejemplo.com/foto.jpg (opcional)",
      signingIn: "Iniciando sesión...",
      creatingAccount: "Creando cuenta...",
      dontHaveAccount: "¿No tienes una cuenta?",
      alreadyHaveAccount: "¿Ya tienes una cuenta?",
      allFieldsRequired: "Todos los campos son obligatorios",
      nameEmailPasswordRequired: "El nombre, correo electrónico y contraseña son obligatorios",
      demoCredentials: "Credenciales de Demostración:",
    },
    // Private Route
    privateRoute: {
      accessRestricted: "Acceso Restringido",
      signInRequired: "Necesitas iniciar sesión para acceder a esta página.",
      createAccount: "Crear Cuenta",
    },
    // Common
    common: {
      loading: "Cargando...",
      cancel: "Cancelar",
      save: "Guardar",
      delete: "Eliminar",
      update: "Actualizar",
      create: "Crear",
      search: "Buscar",
      filter: "Filtrar",
      by: "por",
      attendees: "asistentes",
    },
  },
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      events: "Événements",
      addEvent: "Ajouter Événement",
      myEvents: "Mes Événements",
      signIn: "Se Connecter",
      logout: "Déconnexion",
    },
    // Theme
    theme: {
      toggle: "Changer le thème",
      light: "Clair",
      dark: "Sombre",
      system: "Système",
    },
    // Language
    language: {
      toggle: "Changer la langue",
      english: "English",
      spanish: "Español",
      french: "Français",
      german: "Deutsch",
    },
    // Home page
    home: {
      heroTitle: "Découvrez des Événements Incroyables",
      heroSubtitle:
        "Rejoignez des événements passionnants dans votre communauté et créez des expériences mémorables avec des personnes partageant les mêmes idées",
      browseEvents: "Parcourir les Événements",
      createEvent: "Créer un Événement",
      upcomingEvents: "Événements à Venir",
      viewAllEvents: "Voir Tous les Événements",
      noUpcomingEvents: "Aucun événement à venir",
      beFirstToCreate: "Soyez le premier à créer un événement dans votre communauté !",
      features: {
        easyCreation: "Création Facile d'Événements",
        easyCreationDesc:
          "Créez et gérez vos événements avec notre interface intuitive. Partagez votre passion avec la communauté.",
        joinConnect: "Rejoindre et Se Connecter",
        joinConnectDesc:
          "Découvrez des événements qui correspondent à vos intérêts et connectez-vous avec des personnes qui partagent vos passions.",
        localCommunity: "Communauté Locale",
        localCommunityDesc:
          "Trouvez des événements qui se déroulent dans votre région et devenez une partie active de votre communauté locale.",
      },
      stats: {
        totalEvents: "Total des Événements",
        activeEvents: "Événements actifs disponibles",
        totalAttendees: "Total des Participants",
        peopleJoining: "Personnes rejoignant des événements",
        thisMonth: "Ce Mois",
        upcomingEvents: "Événements à venir",
      },
    },
    // Events page
    events: {
      title: "Événements",
      subtitle: "Découvrez et rejoignez des événements incroyables dans votre communauté",
      searchPlaceholder: "Rechercher des événements par titre...",
      filterByDate: "Filtrer par date",
      allEvents: "Tous les Événements",
      today: "Aujourd'hui",
      currentWeek: "Semaine Actuelle",
      lastWeek: "Semaine Dernière",
      currentMonth: "Mois Actuel",
      lastMonth: "Mois Dernier",
      joinEvent: "Rejoindre l'Événement",
      alreadyJoined: "Déjà Rejoint",
      noEventsFound: "Aucun événement trouvé",
      adjustFilters: "Essayez d'ajuster vos termes de recherche ou filtres.",
    },
    // Add Event page
    addEvent: {
      title: "Ajouter un Événement",
      subtitle: "Créez un nouvel événement et partagez-le avec la communauté.",
      eventDetails: "Détails de l'Événement",
      eventTitle: "Titre de l'Événement",
      eventTitlePlaceholder: "Entrez le titre de l'événement",
      name: "Nom (qui a publié l'Événement)",
      namePlaceholder: "Votre nom",
      date: "Date",
      time: "Heure",
      location: "Lieu",
      locationPlaceholder: "Entrez le lieu de l'événement",
      description: "Description",
      descriptionPlaceholder: "Décrivez votre événement...",
      attendeeCount: "Nombre de Participants",
      addEventButton: "Ajouter l'Événement",
      addingEvent: "Ajout de l'Événement...",
      cancel: "Annuler",
    },
    // My Events page
    myEvents: {
      title: "Mes Événements",
      subtitle: "Gérez les événements que vous avez créés",
      addEvent: "Ajouter un Événement",
      noEventsYet: "Vous n'avez pas encore créé d'événements",
      createFirstEvent: "Commencez par créer votre premier événement pour rassembler les gens.",
      createYourFirstEvent: "Créez Votre Premier Événement",
      update: "Mettre à Jour",
      delete: "Supprimer",
      deleteConfirmTitle: "Êtes-vous sûr ?",
      deleteConfirmDesc:
        "Cette action ne peut pas être annulée. Cela supprimera définitivement l'événement et toutes les données associées.",
      deleteEvent: "Supprimer l'Événement",
      updateEvent: "Mettre à Jour l'Événement",
      updateEventDesc:
        "Le formulaire de mise à jour irait ici. Dans une vraie application, cela contiendrait le formulaire de mise à jour de l'événement.",
    },
    // Authentication
    auth: {
      welcomeBack: "Bon retour",
      signInSubtitle: "Connectez-vous à votre compte EventHub",
      signIn: "Se Connecter",
      signUp: "S'Inscrire",
      createAccount: "Créez votre compte",
      signUpSubtitle: "Rejoignez EventHub et commencez à découvrir des événements",
      email: "Email",
      emailPlaceholder: "Entrez votre email",
      password: "Mot de Passe",
      passwordPlaceholder: "Entrez votre mot de passe",
      createPassword: "Créez un mot de passe",
      name: "Nom",
      namePlaceholder: "Entrez votre nom complet",
      photoURL: "URL de Photo",
      photoURLPlaceholder: "https://exemple.com/photo.jpg (optionnel)",
      signingIn: "Connexion en cours...",
      creatingAccount: "Création du compte...",
      dontHaveAccount: "Vous n'avez pas de compte ?",
      alreadyHaveAccount: "Vous avez déjà un compte ?",
      allFieldsRequired: "Tous les champs sont obligatoires",
      nameEmailPasswordRequired: "Le nom, l'email et le mot de passe sont obligatoires",
      demoCredentials: "Identifiants de Démonstration :",
    },
    // Private Route
    privateRoute: {
      accessRestricted: "Accès Restreint",
      signInRequired: "Vous devez être connecté pour accéder à cette page.",
      createAccount: "Créer un Compte",
    },
    // Common
    common: {
      loading: "Chargement...",
      cancel: "Annuler",
      save: "Sauvegarder",
      delete: "Supprimer",
      update: "Mettre à Jour",
      create: "Créer",
      search: "Rechercher",
      filter: "Filtrer",
      by: "par",
      attendees: "participants",
    },
  },
  de: {
    // Navigation
    nav: {
      home: "Startseite",
      events: "Veranstaltungen",
      addEvent: "Veranstaltung Hinzufügen",
      myEvents: "Meine Veranstaltungen",
      signIn: "Anmelden",
      logout: "Abmelden",
    },
    // Theme
    theme: {
      toggle: "Design wechseln",
      light: "Hell",
      dark: "Dunkel",
      system: "System",
    },
    // Language
    language: {
      toggle: "Sprache wechseln",
      english: "English",
      spanish: "Español",
      french: "Français",
      german: "Deutsch",
    },
    // Home page
    home: {
      heroTitle: "Entdecke Fantastische Veranstaltungen",
      heroSubtitle:
        "Nimm an aufregenden Veranstaltungen in deiner Gemeinde teil und schaffe unvergessliche Erfahrungen mit Gleichgesinnten",
      browseEvents: "Veranstaltungen Durchsuchen",
      createEvent: "Veranstaltung Erstellen",
      upcomingEvents: "Kommende Veranstaltungen",
      viewAllEvents: "Alle Veranstaltungen Anzeigen",
      noUpcomingEvents: "Keine kommenden Veranstaltungen",
      beFirstToCreate: "Sei der Erste, der eine Veranstaltung in deiner Gemeinde erstellt!",
      features: {
        easyCreation: "Einfache Veranstaltungserstellung",
        easyCreationDesc:
          "Erstelle und verwalte deine Veranstaltungen mit unserer intuitiven Benutzeroberfläche. Teile deine Leidenschaft mit der Gemeinde.",
        joinConnect: "Teilnehmen und Vernetzen",
        joinConnectDesc:
          "Entdecke Veranstaltungen, die deinen Interessen entsprechen, und vernetze dich mit Menschen, die deine Leidenschaften teilen.",
        localCommunity: "Lokale Gemeinschaft",
        localCommunityDesc:
          "Finde Veranstaltungen in deiner Nähe und werde ein aktiver Teil deiner lokalen Gemeinschaft.",
      },
      stats: {
        totalEvents: "Gesamte Veranstaltungen",
        activeEvents: "Aktive Veranstaltungen verfügbar",
        totalAttendees: "Gesamte Teilnehmer",
        peopleJoining: "Menschen, die an Veranstaltungen teilnehmen",
        thisMonth: "Diesen Monat",
        upcomingEvents: "Kommende Veranstaltungen",
      },
    },
    // Events page
    events: {
      title: "Veranstaltungen",
      subtitle: "Entdecke und nimm an fantastischen Veranstaltungen in deiner Gemeinde teil",
      searchPlaceholder: "Veranstaltungen nach Titel suchen...",
      filterByDate: "Nach Datum filtern",
      allEvents: "Alle Veranstaltungen",
      today: "Heute",
      currentWeek: "Aktuelle Woche",
      lastWeek: "Letzte Woche",
      currentMonth: "Aktueller Monat",
      lastMonth: "Letzter Monat",
      joinEvent: "An Veranstaltung Teilnehmen",
      alreadyJoined: "Bereits Teilgenommen",
      noEventsFound: "Keine Veranstaltungen gefunden",
      adjustFilters: "Versuche deine Suchbegriffe oder Filter anzupassen.",
    },
    // Add Event page
    addEvent: {
      title: "Veranstaltung Hinzufügen",
      subtitle: "Erstelle eine neue Veranstaltung und teile sie mit der Gemeinde.",
      eventDetails: "Veranstaltungsdetails",
      eventTitle: "Veranstaltungstitel",
      eventTitlePlaceholder: "Veranstaltungstitel eingeben",
      name: "Name (wer die Veranstaltung veröffentlicht hat)",
      namePlaceholder: "Dein Name",
      date: "Datum",
      time: "Zeit",
      location: "Ort",
      locationPlaceholder: "Veranstaltungsort eingeben",
      description: "Beschreibung",
      descriptionPlaceholder: "Beschreibe deine Veranstaltung...",
      attendeeCount: "Teilnehmerzahl",
      addEventButton: "Veranstaltung Hinzufügen",
      addingEvent: "Veranstaltung wird hinzugefügt...",
      cancel: "Abbrechen",
    },
    // My Events page
    myEvents: {
      title: "Meine Veranstaltungen",
      subtitle: "Verwalte die Veranstaltungen, die du erstellt hast",
      addEvent: "Veranstaltung Hinzufügen",
      noEventsYet: "Du hast noch keine Veranstaltungen erstellt",
      createFirstEvent: "Beginne damit, deine erste Veranstaltung zu erstellen, um Menschen zusammenzubringen.",
      createYourFirstEvent: "Erstelle Deine Erste Veranstaltung",
      update: "Aktualisieren",
      delete: "Löschen",
      deleteConfirmTitle: "Bist du sicher?",
      deleteConfirmDesc:
        "Diese Aktion kann nicht rückgängig gemacht werden. Dies wird die Veranstaltung und alle zugehörigen Daten dauerhaft löschen.",
      deleteEvent: "Veranstaltung Löschen",
      updateEvent: "Veranstaltung Aktualisieren",
      updateEventDesc:
        "Das Aktualisierungsformular würde hier stehen. In einer echten Anwendung würde dies das Formular zur Aktualisierung der Veranstaltung enthalten.",
    },
    // Authentication
    auth: {
      welcomeBack: "Willkommen zurück",
      signInSubtitle: "Melde dich bei deinem EventHub-Konto an",
      signIn: "Anmelden",
      signUp: "Registrieren",
      createAccount: "Erstelle dein Konto",
      signUpSubtitle: "Tritt EventHub bei und beginne Veranstaltungen zu entdecken",
      email: "E-Mail",
      emailPlaceholder: "Gib deine E-Mail ein",
      password: "Passwort",
      passwordPlaceholder: "Gib dein Passwort ein",
      createPassword: "Erstelle ein Passwort",
      name: "Name",
      namePlaceholder: "Gib deinen vollständigen Namen ein",
      photoURL: "Foto-URL",
      photoURLPlaceholder: "https://beispiel.com/foto.jpg (optional)",
      signingIn: "Anmeldung läuft...",
      creatingAccount: "Konto wird erstellt...",
      dontHaveAccount: "Hast du kein Konto?",
      alreadyHaveAccount: "Hast du bereits ein Konto?",
      allFieldsRequired: "Alle Felder sind erforderlich",
      nameEmailPasswordRequired: "Name, E-Mail und Passwort sind erforderlich",
      demoCredentials: "Demo-Anmeldedaten:",
    },
    // Private Route
    privateRoute: {
      accessRestricted: "Zugang Beschränkt",
      signInRequired: "Du musst angemeldet sein, um auf diese Seite zuzugreifen.",
      createAccount: "Konto Erstellen",
    },
    // Common
    common: {
      loading: "Laden...",
      cancel: "Abbrechen",
      save: "Speichern",
      delete: "Löschen",
      update: "Aktualisieren",
      create: "Erstellen",
      search: "Suchen",
      filter: "Filtern",
      by: "von",
      attendees: "Teilnehmer",
    },
  },
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved language preference
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0] as Language
      if (translations[browserLang]) {
        setLanguage(browserLang)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)
    }
  }, [language, mounted])

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  if (!mounted) {
    return null
  }

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
