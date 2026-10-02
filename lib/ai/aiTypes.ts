export type InvitationTone =
    | "elegant"
    | "modern"
    | "traditional"
    | "fun";

export type InvitationEventType =
    | "wedding"
    | "birthday"
    | "engagement"
    | "baby-shower"
    | "housewarming"
    | "anniversary"
    | "special-event";

export type InvitationDesignType =
    | "2d"
    | "3d"
    | "video";

export type InvitationDesignStyle =
    | "elegant"
    | "modern"
    | "traditional"
    | "minimal"
    | "luxury"
    | "playful"
    | "cinematic";

export type InvitationDesignLayout =
    | "centered"
    | "editorial"
    | "framed"
    | "diagonal"
    | "emblem"
    | "minimal";

export type InvitationColorTheme =
    | "muted-romance"
    | "botanical-green"
    | "pastel-confetti"
    | "dark-cinematic"
    | "jewel-tone"
    | "lavender-milk"
    | "metallic-night"
    | "coastal-blue";

export type InvitationTypography =
    | "classic"
    | "modern"
    | "minimal"
    | "elegant"
    | "bold";

export type InvitationDecoration =
    | "floral"
    | "gold-accents"
    | "geometric"
    | "minimal"
    | "sparkles"
    | "traditional"
    | "cinematic";

export type InvitationAIRequest = {
    eventType: InvitationEventType;
    eventName: string;
    hostNames?: string;
    eventDate?: string;
    eventTime?: string;
    venue?: string;
    tone: InvitationTone;
    designType?: InvitationDesignType;
    additionalDetails?: string;
};

export type InvitationAIContent = {
    title: string;
    invitationMessage: string;
    shortDescription: string;
    rsvpMessage: string;
    whatsappMessage: string;
};

export type InvitationAIDesign = {
    type: InvitationDesignType;
    style: InvitationDesignStyle;
    layout: InvitationDesignLayout;
    colorTheme: InvitationColorTheme;
    typography: InvitationTypography;
    decoration: InvitationDecoration;
};

export type InvitationAIGeneratedResult = {
    variations: InvitationAIContent[];
    design: InvitationAIDesign;
};

export type InvitationAIResponse = {
    success: boolean;
    data?: InvitationAIGeneratedResult;
    error?: string;
};