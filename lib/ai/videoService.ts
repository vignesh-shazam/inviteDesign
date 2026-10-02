import type {
    InvitationAIDesign,
    InvitationAIContent,
} from "./aiTypes";

export type AIVideoRequest = {
    eventType: string;
    eventName: string;
    hostNames?: string;
    eventDate?: string;
    eventTime?: string;
    venue?: string;
    design?: InvitationAIDesign;
    content?: InvitationAIContent;
};

export function buildInvitationVideoPrompt(
    request: AIVideoRequest,
): string {
    const designStyle =
        request.design?.style ?? "elegant";

    const colorTheme =
        request.design?.colorTheme ??
        "muted-romance";

    const decoration =
        request.design?.decoration ??
        "floral";

    return `
Create a premium cinematic digital invitation video.

EVENT
Event type: ${request.eventType}
Event name: ${request.eventName}
Host names: ${request.hostNames || "Not provided"}
Date: ${request.eventDate || "Not provided"}
Time: ${request.eventTime || "Not provided"}
Venue: ${request.venue || "Not provided"}

DESIGN
Style: ${designStyle}
Color theme: ${colorTheme}
Decoration: ${decoration}

VIDEO FORMAT
- Portrait 9:16
- Premium invitation aesthetic
- 8 seconds
- Cinematic motion
- Smooth camera movement
- High-end lighting
- Elegant transitions
- Natural cinematic depth
- Subtle particles and atmospheric effects
- Native elegant background music
- No abrupt cuts

VISUAL DIRECTION

Begin with a dark cinematic background with soft golden
bokeh particles slowly appearing.

Gradually reveal an elegant decorative invitation scene.
Use beautiful ${decoration} elements and refined
${colorTheme} colors.

The camera slowly moves forward toward the invitation
while delicate particles, light rays and decorative
elements move naturally.

Create a premium wedding/invitation-film feeling,
similar to a luxury cinematic invitation.

Use sophisticated composition, realistic lighting,
shallow depth of field and smooth motion.

The final moment should feel like a beautiful
invitation reveal.

IMPORTANT:
- Do not create a fake UI.
- Do not show a web browser.
- Do not show buttons.
- Do not show a phone screen.
- Do not show a play button.
- Do not show watermarks.
- Do not use distorted typography.
- Do not create random logos.
- Do not add unrelated people or objects.
- Keep the center visually clean for invitation text
  overlay by the application.

The video should look like a professionally produced
digital invitation film.
`;
}