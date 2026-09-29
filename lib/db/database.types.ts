export type InvitationStatus = "draft" | "published";

export type RSVPAttendance =
  | "attending"
  | "maybe"
  | "not_attending";

export type RSVP = {
  id: string;
  invitationId: string;
  guestName: string;
  attendance: RSVPAttendance;
  guestCount: number;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type InvitationTheme = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

export type InvitationTypography = {
  headingFont: string;
  bodyFont: string;
};

export type Invitation = {
  id: string;
  cardId: string;
  slug: string;
  title: string;
  person1Name: string;
  person2Name: string;
  templateId: string;
  category: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  venueAddress: string;
  mapsUrl: string;
  message: string;
  theme: InvitationTheme;
  typography: InvitationTypography;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;
};