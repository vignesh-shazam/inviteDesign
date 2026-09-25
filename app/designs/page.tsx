"use client";

import { useState } from "react";
import { invitationTemplates } from "@/lib/templates";
import TemplateCard from "@/components/invitation/TemplateCard";

const categories = [
  "All",
  "Wedding",
  "Birthday",
  "Engagement",
  "Baby Shower",
  "Special Event",
];

export default function DesignsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates =
    selectedCategory === "All"
      ? invitationTemplates
      : invitationTemplates.filter(
          (template) => template.category === selectedCategory,
        );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Invitation Designs
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Find a design for your occasion
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Explore our collection of invitation styles and choose the one
            that fits your celebration.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  isSelected
                    ? "bg-violet-500 text-white"
                    : "border border-slate-700 text-slate-300 hover:border-violet-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
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
    </main>
  );
}