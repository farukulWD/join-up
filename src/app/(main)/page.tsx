"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EventCard from "@/components/event-card";
import { Calendar, Plus, Sparkles, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import AnimatedPage from "@/components/animated-page";
import AnimatedButton from "@/components/animated-button";
import StaggerContainer from "@/components/stagger-container";
import { mockCurrentUser, mockEvents } from "@/lib/mock-data";
import AnimatedCounter from "@/components/animated-counter";

export default function HomePage() {
  const { t } = useI18n();

  // Get upcoming events (next 3 events)
  const upcomingEvents = mockEvents
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const totalAttendees = mockEvents.reduce(
    (sum, event) => sum + event.attendeeCount,
    0
  );

  return (
    <AnimatedPage>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 rounded-lg overflow-hidden">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                <span>Connect • Discover • Experience</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t("home.heroTitle")}
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {t("home.heroSubtitle")}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <AnimatedButton
              size="lg"
              asChild
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Link href="/events">
                <Calendar className="mr-2 h-5 w-5" />
                {t("home.browseEvents")}
              </Link>
            </AnimatedButton>
            <AnimatedButton
              size="lg"
              variant="outline"
              asChild
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Link href="/add-event">
                <Plus className="mr-2 h-5 w-5" />
                {t("home.createEvent")}
              </Link>
            </AnimatedButton>
          </motion.div>
        </section>

        {/* Features Section */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Calendar,
              title: t("home.features.easyCreation"),
              description: t("home.features.easyCreationDesc"),
              color: "text-blue-600",
            },
            {
              icon: Users,
              title: t("home.features.joinConnect"),
              description: t("home.features.joinConnectDesc"),
              color: "text-green-600",
            },
            {
              icon: MapPin,
              title: t("home.features.localCommunity"),
              description: t("home.features.localCommunityDesc"),
              color: "text-purple-600",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.5 + index * 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <feature.icon
                      className={`h-12 w-12 ${feature.color} mx-auto mb-4`}
                    />
                  </motion.div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Stats Section */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: t("home.stats.totalEvents"),
              value: mockEvents.length,
              description: t("home.stats.activeEvents"),
              icon: Calendar,
            },
            {
              title: t("home.stats.totalAttendees"),
              value: totalAttendees,
              description: t("home.stats.peopleJoining"),
              icon: Users,
            },
            {
              title: t("home.stats.thisMonth"),
              value: upcomingEvents.length,
              description: t("home.stats.upcomingEvents"),
              icon: Calendar,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter value={stat.value} duration={2} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Upcoming Events Section */}
        <section className="space-y-6">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold">{t("home.upcomingEvents")}</h2>
            <AnimatedButton variant="outline" asChild>
              <Link href="/events">{t("home.viewAllEvents")}</Link>
            </AnimatedButton>
          </motion.div>

          {upcomingEvents.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onJoin={(eventId) => console.log("Join event:", eventId)}
                  currentUserId={mockCurrentUser._id}
                  index={index}
                />
              ))}
            </StaggerContainer>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t("home.noUpcomingEvents")}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t("home.beFirstToCreate")}
                  </p>
                  <AnimatedButton asChild>
                    <Link href="/add-event">{t("home.createEvent")}</Link>
                  </AnimatedButton>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>
      </div>
    </AnimatedPage>
  );
}
