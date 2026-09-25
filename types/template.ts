export type InvitationTemplate = {
  id: string;
  title: string;
  category: string;
  description: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    accentColor: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
};