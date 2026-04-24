export function ClientCaseStudies() {
  const cases = [
    {
      client: "CBD Commercial Tower",
      metrics: "40% faster bond return",
      stat: "20-story complex",
      desc: "Comprehensive weekly maintenance for high-footfall corporate environment.",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      client: "West Leederville Residential",
      metrics: "98% satisfaction rate",
      stat: "4-bedroom luxury home",
      desc: "Detail-oriented deep clean focused on allergen reduction for family health.",
      gradient: "from-purple-500 to-indigo-400"
    },
    {
      client: "National Retail Chain",
      metrics: "15% increase in foot traffic",
      stat: "50+ locations nationwide",
      desc: "Standardized cleaning protocols across retail outlets to ensure brand consistency.",
      gradient: "from-emerald-500 to-teal-400"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">
          Enterprise <span className="text-sky-500">Case Studies</span>
        </h2>
      </div>
      
      <div className="flex space-x-6 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 scrollbar-hide">
        {cases.map((c, i) => (
          <div 
            key={i} 
            className="flex-none w-[350px] bg-white/10 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-xl hover:scale-105 transition-transform"
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${c.gradient} mb-6`} />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{c.client}</h3>
            <div className="text-sky-500 font-bold text-sm mb-4">{c.metrics} | {c.stat}</div>
            <p className="text-slate-600 dark:text-slate-300">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}