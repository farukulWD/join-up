import { TResponse } from "@/lib/types";
import { baseApi } from "../base-api";
import { EventFormValues } from "@/app/(main)/add-event/page";
import { TUser } from "@/redux/features/auth-slice";

export type TEventResponse = {
  _id: string;
  title: string;
  date: string;
  time: string;
  name: string;
  location: string;
  description?: string;
  postedBy: TUser;
  joinedUsers: TUser[];
  createdAt: Date;
  updatedAt: Date;
  attendeeCount: number;
};

export type TParams = {
  searchTerm?: string;
  location?: string;
  date?: string | Date;
  dateRange?: string;
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
};

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<TResponse<TEventResponse>, EventFormValues>({
      query: (eventData) => ({
        url: "/events/create-event",
        method: "POST",
        data: eventData,
      }),
      invalidatesTags: ["events"],
    }),
    getEvents: builder.query<TResponse<TEventResponse[]>, TParams>({
      query: (params) => ({
        url: "/events/all-events",
        method: "GET",
        params,
      }),
    }),
    getEventById: builder.query<TResponse<TEventResponse>, string>({
      query: (eventId) => ({
        url: `/events/${eventId}`,
        method: "GET",
      }),
    }),
    joinEvent: builder.mutation<TResponse<TEventResponse>, string>({
      query: (eventId) => ({
        url: `/events/join-event/${eventId}`,
        method: "POST",
      }),
      invalidatesTags: ["events"],
    }),
    updateEvent: builder.mutation<
      TResponse<TEventResponse>,
      { eventId: string; eventData: EventFormValues }
    >({
      query: ({ eventId, eventData }) => ({
        url: `/events/update/${eventId}`,
        method: "PUT",
        data: eventData,
      }),
    }),

    getMyEvents: builder.query<TResponse<TEventResponse[]>, undefined>({
      query: () => ({
        url: `/events/my-events`,
        method: "GET",
      }),
      providesTags: ["events"],
    }),
    deleteEvent: builder.mutation<TResponse<{}>, string>({
      query: (eventId) => ({
        url: `/events/delete-event/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["events"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useGetEventByIdQuery,
  useJoinEventMutation,
  useUpdateEventMutation,
  useGetMyEventsQuery,
  useDeleteEventMutation,
} = eventApi;
