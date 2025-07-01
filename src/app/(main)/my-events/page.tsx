"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EventCard from "@/components/event-card";
import { Plus, Calendar } from "lucide-react";
import Link from "next/link";
import type { Event } from "@/lib/types";
import { useAppSelector } from "@/redux/hooks";
import {
  useDeleteEventMutation,
  useGetMyEventsQuery,
} from "@/redux/api/event/eventApi";
import { globalErrorHandler } from "@/lib/global-error-handler";
import { toast } from "sonner";
import LoadingSpinner from "@/components/laoding-spinner";
import AnimatedPage from "@/components/animated-page";

export default function MyEventsPage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: myEvents, isLoading: eventsLoading } = useGetMyEventsQuery(
    undefined,
    {
      skip: !isAuthenticated || !user?._id,
    }
  );

  const [deleteEvent, { isLoading }] = useDeleteEventMutation();

  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [updateEventId, setUpdateEventId] = useState<string | null>(null);

  const handleUpdateEvent = (eventId: string) => {
    setUpdateEventId(eventId);
    // In a real app, you would open an update form modal or navigate to update page
    console.log("Update event:", eventId);
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const result = await deleteEvent(eventId).unwrap();
      if (result.success) {
        toast.success("Event deleted successfully");
      }
    } catch (error) {
      globalErrorHandler(error);
    }
  };

  const confirmDelete = () => {
    if (deleteEventId) {
      handleDeleteEvent(deleteEventId);
    }
  };

  if (eventsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  return (
    <AnimatedPage className="space-y-6 min-h-[calc(100vh-4rem)] px-4 md:px-8 py-4 lg:px-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">My Event</h1>
          <p className="text-muted-foreground">
            Manage the events you've created
          </p>
        </div>
        <Button asChild>
          <Link href="/add-event">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Link>
        </Button>
      </div>

      {myEvents?.data && myEvents?.data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents?.data?.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              showActions={true}
              onUpdate={handleUpdateEvent}
              onDelete={() => setDeleteEventId(event._id)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              You haven't created any events yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Start by creating your first event to bring people together.
            </p>
            <Button asChild>
              <Link href="/add-event">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Event
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteEventId}
        onOpenChange={() => setDeleteEventId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Event
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Update Event Dialog (placeholder) */}
      <Dialog
        open={!!updateEventId}
        onOpenChange={() => setUpdateEventId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Event</DialogTitle>
            <DialogDescription>
              Update form would go here. In a real application, this would
              contain the event update form.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateEventId(null)}>
              Cancel
            </Button>
            <Button onClick={() => setUpdateEventId(null)}>Update Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AnimatedPage>
  );
}
