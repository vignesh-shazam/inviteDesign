"use client";

type WhatsAppShareButtonProps = {
  title: string;
  category: string;
  date: string;
  venue: string;
};

export default function WhatsAppShareButton({
  title,
  category,
  date,
  venue,
}: WhatsAppShareButtonProps) {
  function handleShare() {
    const invitationUrl = window.location.href;

    const message = [
      `\u{1F48C} You're invited to ${title}!`,
      "",
      `\u{1F389} ${category}`,
      `\u{1F4C5} ${date}`,
      `\u{1F4CD} ${venue}`,
      "",
      "\u{2728} View the invitation:",
      invitationUrl,
    ].join("\n");

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      message,
    )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:opacity-90 sm:w-auto"
      style={{
        backgroundColor: "#25D366",
      }}
      aria-label="Share invitation on WhatsApp"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.53 0 .2 5.33.2 11.88c0 2.09.55 4.13 1.6 5.93L.1 24l6.34-1.66a11.88 11.88 0 0 0 5.64 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.14-3.45-8.41ZM12.09 21.76h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.76.98 1-3.67-.23-.38a9.86 9.86 0 0 1-1.51-5.22c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.1 1.03 6.96 2.9a9.82 9.82 0 0 1 2.89 6.97c0 5.43-4.42 9.86-9.85 9.86Zm5.41-7.38c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.53.07-.81.38-.28.3-1.06 1.03-1.06 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.35Z"
          fill="currentColor"
        />
      </svg>

      Share on WhatsApp
    </button>
  );
}