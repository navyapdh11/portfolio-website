"use client";

import { useState } from "react";

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  live: string;
  category: string;
}

const initialProjects: Project[] = [
  { id: 1, title: "E-Commerce Platform", description: "A full-featured e-commerce platform with Next.js, Stripe integration, and admin dashboard.", tags: ["Next.js", "TypeScript", "Stripe"], image: "🛒", github: "https://github.com/navyapdh11", live: "https://portfolio-website-perth-tea.vercel.app", category: "fullstack" },
  { id: 2, title: "Real-Time Chat App", description: "Real-time messaging application with WebSocket support and authentication.", tags: ["React", "Node.js", "Socket.io"], image: "💬", github: "https://github.com/navyapdh11", live: "https://portfolio-website-perth-tea.vercel.app", category: "fullstack" },
  { id: 3, title: "Analytics Dashboard", description: "Interactive data visualization dashboard with dynamic charts and filters.", tags: ["React", "D3.js", "Tailwind"], image: "📊", github: "https://github.com/navyapdh11", live: "https://portfolio-website-perth-tea.vercel.app", category: "frontend" },
  { id: 4, title: "Task Management API", description: "RESTful API for task management with role-based access control.", tags: ["Node.js", "Express", "PostgreSQL"], image: "📝", github: "https://github.com/navyapdh11", live: "https://portfolio-website-perth-tea.vercel.app", category: "backend" },
  { id: 5, title: "Weather App", description: "Beautiful weather application with location-based forecasts and interactive maps.", tags: ["React", "OpenWeather API"], image: "🌤️", github: "https://github.com/navyapdh11", live: "https://portfolio-website-perth-tea.vercel.app", category: "frontend" },
  { id: 6, title: "Blog CMS", description: "Content management system with markdown editor, SEO optimization, and media library.", tags: ["Next.js", "Sanity"], image: "✍️", github: "https://github.com/navyapdh11", live: "https://portfolio-website-perth-tea.vercel.app", category: "fullstack" },
];

export default function Projects() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeCategory] = useState("all");

  const updateProject = (id: number, field: keyof Project, value: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const filteredProjects = activeCategory === "all" ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">Featured <span className="text-blue-500">Projects</span></h2>
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className="mt-4 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg text-xs hover:bg-zinc-300 transition-colors"
          >
            {isAdmin ? "Exit Project Control" : "Admin Control Panel"}
          </button>
        </div>

        {isAdmin && (
          <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-2xl mb-12 border border-zinc-300 dark:border-zinc-700">
            <h3 className="font-bold text-lg mb-4 text-zinc-900 dark:text-white">Admin Control: Project Flashcards</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {projects.map(p => (
                <div key={p.id} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                  <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Title</label>
                  <input value={p.title} onChange={e => updateProject(p.id, 'title', e.target.value)} className="w-full font-bold text-zinc-900 dark:text-white bg-transparent mb-2 border-b border-zinc-200" />
                  <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Description</label>
                  <textarea value={p.description} onChange={e => updateProject(p.id, 'description', e.target.value)} className="w-full text-sm text-zinc-600 dark:text-zinc-400 bg-transparent h-16 border-b border-zinc-200" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-zinc-50 dark:bg-zinc-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover-lift">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-7xl">
                {project.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">{project.description}</p>
                <div className="flex gap-3 mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-zinc-900 dark:bg-zinc-700 text-white rounded-lg text-center text-sm font-medium hover:bg-zinc-800">Code</a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg text-center text-sm font-medium hover:bg-blue-600">Live Demo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
