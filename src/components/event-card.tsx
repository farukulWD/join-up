"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

import { useI18n } from "@/lib/i18n-context";
import AnimatedButton from "./animated-button";
import { TEventResponse } from "@/redux/api/event/eventApi";

interface EventCardProps {
  event: TEventResponse;
  showActions?: boolean;
  onJoin?: (eventId: string) => void;
  onUpdate?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
  currentUserId?: string;
  index?: number;
}

export default function EventCard({
  event,
  showActions = false,
  onJoin,
  onUpdate,
  onDelete,
  currentUserId,
  index = 0,
}: EventCardProps) {
  const { t } = useI18n();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const hasUserJoined =
    currentUserId &&
    event.joinedUsers.some((user) => user._id === currentUserId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="w-full hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <CardHeader className="pb-3">
          <motion.div
            className="flex items-start justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="space-y-1">
              <h3 className="font-semibold capitalize text-lg leading-tight">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground">by {event.postedBy.name}</p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {event.attendeeCount}
              </Badge>
            </motion.div>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-3">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <motion.div
              className="flex items-center space-x-2 text-sm text-muted-foreground"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.date)}</span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2 text-sm text-muted-foreground"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Clock className="h-4 w-4" />
              <span>{formatTime(event.time)}</span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2 text-sm text-muted-foreground"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </motion.div>

            <p className="text-sm text-muted-foreground line-clamp-3">
              {event.description}
            </p>
          </motion.div>
        </CardContent>

        <CardFooter className="pt-3">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            {showActions ? (
              <div className="flex space-x-2 w-full">
                <AnimatedButton
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdate?.(event._id)}
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("myEvents.update")}
                </AnimatedButton>
                <AnimatedButton
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete?.(event._id)}
                  className="flex-1"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "hsl(var(--destructive))",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("myEvents.delete")}
                </AnimatedButton>
              </div>
            ) : (
              <AnimatedButton
                className="w-full"
                onClick={() => onJoin?.(event._id)}
                disabled={hasUserJoined as boolean}
                whileHover={hasUserJoined ? {} : { scale: 1.02 }}
                whileTap={hasUserJoined ? {} : { scale: 0.98 }}
              >
                {hasUserJoined
                  ? t("events.alreadyJoined")
                  : t("events.joinEvent")}
              </AnimatedButton>
            )}
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
