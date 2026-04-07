export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            About <span className="text-blue-500">Me</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
            Passionate developer with a love for clean code and beautiful interfaces
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image/Stats */}
          <div className="space-y-8">
            {/* Profile Image Placeholder */}
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-9xl">👨‍💻</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-3xl font-bold text-blue-500">5+</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Years Exp.</div>
              </div>
              <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-3xl font-bold text-purple-500">50+</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Projects</div>
              </div>
              <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-3xl font-bold text-green-500">30+</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Clients</div>
              </div>
            </div>
          </div>

          {/* Right Column - Bio */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              A dedicated developer based in San Francisco 🌉
            </h3>
            
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              I'm a full-stack developer with over 5 years of experience building web applications 
              that solve real-world problems. My journey into programming started when I was 15, 
              hacking together MySpace layouts and realizing the power of code to create something 
              from nothing.
            </p>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Today, I specialize in the React ecosystem, particularly Next.js for building 
              performant, SEO-friendly applications. I'm equally comfortable working on the backend 
              with Node.js, designing databases, and deploying to cloud platforms like AWS and Vercel.
            </p>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When I'm not coding, you'll find me contributing to open-source projects, writing 
              technical blog posts, or exploring the latest developments in AI and machine learning.
            </p>

            {/* Quick Info */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-blue-500">📍</span>
                <span className="text-zinc-700 dark:text-zinc-300">San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-500">🎓</span>
                <span className="text-zinc-700 dark:text-zinc-300">B.S. Computer Science</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-500">💼</span>
                <span className="text-zinc-700 dark:text-zinc-300">Open to freelance & full-time</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-500">🌐</span>
                <span className="text-zinc-700 dark:text-zinc-300">English, Spanish</span>
              </div>
            </div>

            {/* Download Resume Button */}
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all hover:shadow-lg hover:shadow-blue-500/30 mt-4 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
