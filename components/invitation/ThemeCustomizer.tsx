"use client";

import type { InvitationTemplate } from "@/types/template";

type ThemeCustomizerProps = {
  template: InvitationTemplate;
  originalTemplate: InvitationTemplate;
  onChange: (template: InvitationTemplate) => void;
};

const colorFields = [
  {
    key: "primaryColor",
    label: "Primary Color",
  },
  {
    key: "secondaryColor",
    label: "Secondary Color",
  },
  {
    key: "accentColor",
    label: "Accent Color",
  },
  {
    key: "backgroundColor",
    label: "Background Color",
  },
  {
    key: "textColor",
    label: "Text Color",
  },
] as const;

const headingFonts = [
  "Georgia",
  "Times New Roman",
  "Arial",
  "Trebuchet MS",
  "Verdana",
];

const bodyFonts = [
  "Arial",
  "Verdana",
  "Trebuchet MS",
  "Georgia",
  "Times New Roman",
];

export default function ThemeCustomizer({
  template,
  originalTemplate,
  onChange,
}: ThemeCustomizerProps) {
  function handleColorChange(
    key: (typeof colorFields)[number]["key"],
    value: string,
  ) {
    onChange({
      ...template,
      theme: {
        ...template.theme,
        [key]: value,
      },
    });
  }

  function handleHeadingFontChange(value: string) {
    onChange({
      ...template,
      typography: {
        ...template.typography,
        headingFont: value,
      },
    });
  }

  function handleBodyFontChange(value: string) {
    onChange({
      ...template,
      typography: {
        ...template.typography,
        bodyFont: value,
      },
    });
  }

  function handleReset() {
    onChange({
      ...originalTemplate,
      theme: {
        ...originalTemplate.theme,
      },
      typography: {
        ...originalTemplate.typography,
      },
    });
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
          Theme Customization
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">
          Customize your invitation
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Adjust colors and typography to match your celebration.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-white">
          Colors
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {colorFields.map((field) => (
            <label
              key={field.key}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4"
            >
              <span className="text-sm font-medium text-slate-200">
                {field.label}
              </span>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-500">
                  {template.theme[field.key]}
                </span>

                <input
                  type="color"
                  value={template.theme[field.key]}
                  onChange={(event) =>
                    handleColorChange(field.key, event.target.value)
                  }
                  className="h-9 w-12 cursor-pointer rounded-lg border border-slate-700 bg-transparent p-1"
                  aria-label={field.label}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-white">
          Typography
        </h3>

        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">
              Heading Font
            </span>

            <select
              value={template.typography.headingFont}
              onChange={(event) =>
                handleHeadingFontChange(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
            >
              {headingFonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">
              Body Font
            </span>

            <select
              value={template.typography.bodyFont}
              onChange={(event) =>
                handleBodyFontChange(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
            >
              {bodyFonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={handleReset}
        className="mt-6 w-full rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
      >
        Reset Customization
      </button>
    </section>
  );
}