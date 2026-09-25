import type { InvitationTemplate } from "@/types/template";

export const invitationTemplates: InvitationTemplate[] = [
  {
    id: "elegant-wedding",
    title: "Elegant Wedding",
    category: "Wedding",
    description:
      "A timeless design for an elegant wedding celebration.",
    theme: {
      primaryColor: "#8b5cf6",
      secondaryColor: "#c4b5fd",
      backgroundColor: "#0f172a",
      textColor: "#f8fafc",
      accentColor: "#a78bfa",
    },
    typography: {
      headingFont: "Playfair Display",
      bodyFont: "Inter",
    },
  },
  {
    id: "royal-wedding",
    title: "Royal Celebration",
    category: "Wedding",
    description:
      "A luxurious invitation for a grand celebration.",
    theme: {
      primaryColor: "#d4af37",
      secondaryColor: "#f5d76e",
      backgroundColor: "#18181b",
      textColor: "#fafafa",
      accentColor: "#eab308",
    },
    typography: {
      headingFont: "Cinzel",
      bodyFont: "Inter",
    },
  },
  {
    id: "modern-birthday",
    title: "Modern Birthday",
    category: "Birthday",
    description:
      "A stylish and modern design for a memorable birthday.",
    theme: {
      primaryColor: "#ec4899",
      secondaryColor: "#f9a8d4",
      backgroundColor: "#111827",
      textColor: "#f9fafb",
      accentColor: "#f472b6",
    },
    typography: {
      headingFont: "Poppins",
      bodyFont: "Inter",
    },
  },
  {
    id: "classic-engagement",
    title: "Classic Engagement",
    category: "Engagement",
    description:
      "A sophisticated invitation for your engagement ceremony.",
    theme: {
      primaryColor: "#14b8a6",
      secondaryColor: "#99f6e4",
      backgroundColor: "#0f172a",
      textColor: "#f8fafc",
      accentColor: "#2dd4bf",
    },
    typography: {
      headingFont: "Cormorant Garamond",
      bodyFont: "Inter",
    },
  },
  {
    id: "baby-shower",
    title: "Little Celebration",
    category: "Baby Shower",
    description:
      "A beautiful invitation for a joyful baby shower.",
    theme: {
      primaryColor: "#60a5fa",
      secondaryColor: "#bfdbfe",
      backgroundColor: "#172033",
      textColor: "#f8fafc",
      accentColor: "#93c5fd",
    },
    typography: {
      headingFont: "Quicksand",
      bodyFont: "Inter",
    },
  },
  {
    id: "minimal-event",
    title: "Modern Minimal",
    category: "Special Event",
    description:
      "A clean and minimal invitation for any special occasion.",
    theme: {
      primaryColor: "#f8fafc",
      secondaryColor: "#cbd5e1",
      backgroundColor: "#020617",
      textColor: "#f8fafc",
      accentColor: "#94a3b8",
    },
    typography: {
      headingFont: "DM Sans",
      bodyFont: "Inter",
    },
  },
];

export function getTemplateById(
  templateId: string,
): InvitationTemplate | undefined {
  return invitationTemplates.find(
    (template) => template.id === templateId,
  );
}