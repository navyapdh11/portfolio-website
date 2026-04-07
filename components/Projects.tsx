"use client";

import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with Next.js, Stripe integration, and admin dashboard. Built with performance and scalability in mind.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    image: "🛒",
    github: "#",
    live: "#",
    category: "fullstack",
  },
  {
    id: 2,
    title: "Real-Time Chat App",
    description:
      "A real-time messaging application with WebSocket support, user authentication, and file sharing capabilities.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    image: "💬",
    github: "#",
    live: "#",
    category: "fullstack",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description:
      "Interactive data visualization dashboard with dynamic charts, filters, and export functionality for business metrics.",
    tags: ["React", "D3.js", "REST API", "Tailwind"],
    image: "📊",
    github: "#",
    live: "#",
    category: "frontend",
  },
  {
    id: 4,
    title: "Task Management API",
    description:
      "RESTful API for a task management system with role-based access control, notifications, and team collaboration features.",
    tags: ["Node.js", "Express", "PostgreSQL", "JWT"],
    image: "📝",
    github: "#",
    live: "#",
    category: "backend",
  },
  {
    id: 5,
    title: "Weather App",
    description:
      "Beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts.",
    tags: ["React", "OpenWeather API", "PWA", "CSS"],
    image: "🌤️",
    github: "#",
    live: "#",
    category: "frontend",
  },
  {
    id: 6,
    title: "Blog CMS",
    description:
      "Content management system with markdown editor, SEO optimization, media library, and multi-author support.",
    tags: ["Next.js", "Sanity", "TypeScript", "Vercel"],
    image: "✍️",
    github: "#",
    live: "#",
    category: "fullstack",
  },
];

const categories = [
  { key: "all", label: "All Projects" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "fullstack", label: "Full Stack" },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
            A selection of my recent work showcasing different technologies and solutions
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-50 dark:bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group"
            >
              {/* Project Image/Visual */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-7xl group-hover:scale-110 transition-transform">
                  {project.image}
                </span>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    className="flex-1 px-4 py-2 bg-zinc-900 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-600 transition-colors text-center text-sm font-medium"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Code
                    </span>
                  </a>
                  <a
                    href={project.live}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center text-sm font-medium"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
