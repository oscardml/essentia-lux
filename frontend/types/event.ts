export interface EventItem {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  target_audience: string | null;
  event_date: string;
  location_name: string;
  location_address: string;
  instagram_handles: string[];
  features_included: string[];
  capacity: number;
  active: boolean;
  spots_remaining: number;
  registered_count: number;
}

export interface EventRegistrationInput {
  eventId: string;
  fullName: string;
  phone: string;
  instagramHandle: string;
}
