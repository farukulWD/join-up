"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Calendar, Clock, MapPin, FileText, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAppSelector } from "@/redux/hooks";
import AnimatedPage from "@/components/animated-page";
import { useCreateEventMutation } from "@/redux/api/event/eventApi";
import { globalErrorHandler } from "@/lib/global-error-handler";
import { toast } from "sonner";
import { motion } from "framer-motion";

const eventValidationSchema = z.object({
  title: z.string().min(1, { message: "Event title is required" }),
  date: z.string().min(1, { message: "Event date is required" }),
  time: z.string().min(1, { message: "Event time is required" }),
  location: z.string().min(1, { message: "Event location is required" }),
  description: z.string().optional(),
  postedBy: z.string().min(1, { message: "Event posted by id is required" }),
  name: z.string().min(1, { message: "Your name is required" }),
});

export type EventFormValues = z.infer<typeof eventValidationSchema>;

export default function AddEventPage() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [createEvent, { isLoading }] = useCreateEventMutation();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventValidationSchema),
    defaultValues: {
      title: "",
      name: user?.name || "",
      date: "",
      time: "",
      location: "",
      description: "",
      postedBy: user?._id || "",
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    if (isLoading) return;
    try {
      const result = await createEvent(data).unwrap();
      if (result?.success) {
        toast.success(result.message || "Event added successfully");
        form.reset();
        router.push("/my-events");
      }
    } catch (error) {
      console.log(error);
      globalErrorHandler(error);
    }
  };

  return (
    <AnimatedPage className="max-w-2xl min-h-[calc(100vh-4rem)] py-4 mx-auto space-y-6">
      <motion.div
        className="w-full  space-y-6"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold">Add Event</h1>
          <p className="text-muted-foreground">
            Create a new event and share it with the community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Event Details
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Event Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter event title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Time
                          </FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Location
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter event location"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Describe your event..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="hidden">
                    <FormField
                      control={form.control}
                      name="postedBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Posted By</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Posted by user ID"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1"
                    >
                      {isLoading ? "Adding Event..." : "Add Event"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatedPage>
  );
}
