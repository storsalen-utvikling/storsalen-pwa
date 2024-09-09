import { WP_REST_API_Post } from "wp-types";

export interface CalendarEvent {
  id: number;
  date: Date;
  title: string;
  link: string;
  author: string;
}

export type WP_REST_API_Event = WP_REST_API_Post & {
  start_date: string;
  acf: {
    internal_link: string,
    taler: string
  }
}

export type WP_REST_API_Events = WP_REST_API_Event[];
