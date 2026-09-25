"use client";

import { useState } from "react";
import type { InvitationTemplate } from "@/types/template";
import TemplateCard from "@/components/invitation/TemplateCard";

type TemplateGalleryProps = {
  templates: InvitationTemplate[];
};

const categories = [
  "All",
  "Wedding",
  "Birthday",
  "Engagement",
  "Baby Shower",
  "Special Event",
];

export default function TemplateGallery({
  templates,
}: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((template) => {
          return template.category === selectedCategory;
        });

  return (
    <div>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setSelectedCategory(category);
            }}
            className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-violet-500 text-white"
                : "border border-slate-700 text-slate-300 hover:border-violet-400 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Showing {filteredTemplates.length} template
        {filteredTemplates.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="mt-14 rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center">
          <p className="text-slate-400">
            No templates found for this category.
          </p>
        </div>
      )}
    </div>
  );
}