export type InvitationStatus = "draft" | "published";

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
  templateId: string;
  category: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  message: string;
  theme: InvitationTheme;
  typography: InvitationTypography;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;
};