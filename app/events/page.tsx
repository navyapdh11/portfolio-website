import Link from "next/link";
import Image from "next/image";

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Perth Clean-Up Day Festival",
      date: "May 15, 2026",
      location: "Kings Park, Perth",
      description: "Join AASTACLEAN and the local community for a massive park clean-up followed by a cultural food festival and live music.",
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Sustainable Living Workshop",
      date: "June 2, 2026",
      location: "Fremantle Community Centre",
      description: "Learn how to make your own eco-friendly cleaning products at home in this hands-on cultural workshop.",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Cultural <span className="text-sky-500">Events</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover community initiatives, local cultural festivals, and sustainability workshops hosted or sponsored by AASTACLEAN.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col md:flex-row">
              <div className="relative md:w-2/5 h-48 md:h-auto">
                <Image src={event.image} alt={event.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div className="p-6 md:w-3/5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2 text-sm text-sky-600 dark:text-sky-400 font-semibold">
                  <span>📅 {event.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {event.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-3 flex items-center gap-1">
                  <span>📍</span> {event.location}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  {event.description}
                </p>
                <div>
                  <button className="px-4 py-2 bg-sky-500 text-white text-sm font-semibold rounded-lg hover:bg-sky-600 transition-colors">
                    RSVP Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/" className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}