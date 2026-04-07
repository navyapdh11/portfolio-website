const skills = {
  frontend: {
    title: "Frontend",
    items: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 90, icon: "▲" },
      { name: "TypeScript", level: 88, icon: "📘" },
      { name: "Tailwind CSS", level: 92, icon: "🎨" },
      { name: "JavaScript", level: 95, icon: "📜" },
      { name: "HTML/CSS", level: 93, icon: "🌐" },
    ],
  },
  backend: {
    title: "Backend",
    items: [
      { name: "Node.js", level: 88, icon: "🟢" },
      { name: "Python", level: 82, icon: "🐍" },
      { name: "PostgreSQL", level: 85, icon: "🐘" },
      { name: "MongoDB", level: 80, icon: "🍃" },
      { name: "REST APIs", level: 92, icon: "🔌" },
      { name: "GraphQL", level: 78, icon: "◈" },
    ],
  },
  tools: {
    title: "Tools & DevOps",
    items: [
      { name: "Git/GitHub", level: 93, icon: "🔧" },
      { name: "Docker", level: 80, icon: "🐳" },
      { name: "AWS", level: 75, icon: "☁️" },
      { name: "Vercel", level: 90, icon: "▲" },
      { name: "CI/CD", level: 82, icon: "🔄" },
      { name: "Linux", level: 78, icon: "🐧" },
    ],
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-zinc-50 dark:bg-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            My <span className="text-blue-500">Skills</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(skills).map((category) => (
            <div
              key={category.title}
              className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <span>{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Also experienced with
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Redux",
              "Zustand",
              "Prisma",
              "Firebase",
              "Redis",
              "Jest",
              "Cypress",
              "Figma",
              "Agile/Scrum",
              "Webpack",
              "Vite",
              "SASS",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-full text-sm shadow hover:shadow-md hover:bg-blue-50 dark:hover:bg-zinc-700 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
