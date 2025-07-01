"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EventCard from "@/components/event-card";

import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import AnimatedPage from "@/components/animated-page";
import StaggerContainer from "@/components/stagger-container";
import { useAppSelector } from "@/redux/hooks";
import {
  TParams,
  useGetEventsQuery,
  useJoinEventMutation,
} from "@/redux/api/event/eventApi";
import { globalErrorHandler } from "@/lib/global-error-handler";
import { toast } from "sonner";
import DataPagination from "@/components/data-paginaton";
import { CustomDatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";

export default function EventsContent() {
  const { user } = useAppSelector((state) => state.auth);
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [joinEvent, { isLoading: joining }] = useJoinEventMutation();
  const [filters, setFilters] = useState<TParams>({
    page: 1,
    limit: 10,
    date: undefined,
    searchTerm: searchTerm || undefined,
    fields: "title,description,location,postedBy,joinedUsers",
    sort: "-date",
    dateRange: filterPeriod === "all" ? undefined : filterPeriod,
  });

  const { data: events, isLoading } = useGetEventsQuery(filters, {
    skip: !user,
  });

  const handleJoinEvent = async (eventId: string) => {
    if (!user) return;
    try {
      const result = await joinEvent(eventId).unwrap();
      if (result.success) {
        toast.success(result.message || t("events.joinSuccess"));
      }
    } catch (error) {
      globalErrorHandler(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Search className="h-12 w-12 text-muted-foreground" />
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatedPage className="p-6">
      <div className="space-y-6">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold">{t("events.title")}</h1>
          <p className="text-muted-foreground">{t("events.subtitle")}</p>

          {/* Search and Filter Controls */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="relative flex-1">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </motion.div>
              <Input
                placeholder={t("events.searchPlaceholder")}
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters({ ...filters, searchTerm: e.target.value })
                }
                className="pl-10"
              />
            </div>

            <div>
              <CustomDatePicker
                value={filters.date as Date}
                onChange={(date) =>
                  setFilters({ ...filters, date: date || undefined })
                }
                placeholder={t("Filter by date")}
              />
            </div>

            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Select
                value={filters.dateRange || "all"}
                onValueChange={(value) => {
                  setFilters({ ...filters, dateRange: value });
                }}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder={t("events.filterByDate")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("events.allEvents")}</SelectItem>
                  <SelectItem value="today">{t("events.today")}</SelectItem>
                  <SelectItem value="current-week">
                    {t("events.currentWeek")}
                  </SelectItem>
                  <SelectItem value="last-week">
                    {t("events.lastWeek")}
                  </SelectItem>
                  <SelectItem value="current-month">
                    {t("events.currentMonth")}
                  </SelectItem>
                  <SelectItem value="last-month">
                    {t("events.lastMonth")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {filters.searchTerm || filters.date || filters.dateRange ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="secondary"
                  onClick={() => {
                    setFilters({
                      page: 1,
                      limit: 10,
                      date: undefined,
                      searchTerm: "",
                      fields: "title,description,location,postedBy,joinedUsers",
                      sort: "-date",
                      dateRange: "all",
                    });
                    setSearchTerm("");
                    setFilterPeriod("all");
                  }}
                >
                  Reset Filters
                </Button>
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          {events?.data && events?.data?.length > 0 ? (
            <motion.div
              key="events-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events?.data?.map((event, index) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    onJoin={handleJoinEvent}
                    currentUserId={user?._id}
                    index={index}
                    isLoading={joining}
                  />
                ))}
              </StaggerContainer>
            </motion.div>
          ) : (
            <motion.div
              key="no-events"
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              </motion.div>
              <motion.h3
                className="text-lg font-semibold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t("events.noEventsFound")}
              </motion.h3>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {t("events.adjustFilters")}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <DataPagination
        page={filters.page || 1}
        totalPages={events?.meta?.totalPage || 0}
        onPageChanges={(page) =>
          setFilters((prev) => ({
            ...prev,
            page,
          }))
        }
      />
    </AnimatedPage>
  );
}
