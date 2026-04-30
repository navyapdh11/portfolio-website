// AASTACLEAN Knowledge Base — in-memory context engine for the AI Assistant

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  priceRange: string;
  basePrice: number;
  keywords: string[];
}

export interface FAQEntry {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

export interface PolicyEntry {
  id: string;
  title: string;
  description: string;
  keywords: string[];
}

export interface ServiceArea {
  state: string;
  cities: string[];
}

export interface BookingStep {
  step: number;
  title: string;
  description: string;
}

export interface KnowledgeBase {
  services: ServiceCategory[];
  faqs: FAQEntry[];
  policies: PolicyEntry[];
  serviceAreas: ServiceArea[];
  bookingSteps: BookingStep[];
  contactInfo: {
    phone: string;
    email: string;
    hours: string;
    address: string;
  };
}

export const knowledgeBase: KnowledgeBase = {
  services: [
    {
      id: "domestic",
      name: "Domestic Cleaning",
      description:
        "Regular home cleaning services tailored to your household needs. Includes dusting, vacuuming, mopping, kitchen and bathroom sanitization.",
      icon: "🏠",
      priceRange: "$120–$250",
      basePrice: 120,
      keywords: [
        "domestic",
        "home",
        "house",
        "regular",
        "cleaning",
        "residential",
        "maintenance",
        "weekly",
        "fortnightly",
      ],
    },
    {
      id: "commercial",
      name: "Commercial Cleaning",
      description:
        "Professional office and commercial space cleaning. Available after hours, with custom plans tailored to your business requirements. Fully insured.",
      icon: "🏢",
      priceRange: "$180–$500",
      basePrice: 180,
      keywords: [
        "commercial",
        "office",
        "business",
        "corporate",
        "workplace",
        "after hours",
        "insured",
        "custom plan",
      ],
    },
    {
      id: "end-of-lease",
      name: "End of Lease Cleaning",
      description:
        "Bond-back guaranteed end-of-lease cleaning. Comprehensive deep clean to ensure your full bond return. 48-hour turnaround available.",
      icon: "🔑",
      priceRange: "$250–$450",
      basePrice: 250,
      keywords: [
        "end of lease",
        "bond",
        "bond-back",
        "move out",
        "vacate",
        "lease",
        "tenancy",
        "48 hour",
        "turnaround",
        "guarantee",
      ],
    },
    {
      id: "carpet",
      name: "Carpet Cleaning",
      description:
        "Deep steam cleaning with professional stain removal. Quick-dry technology so you can use your carpets the same day.",
      icon: "🧹",
      priceRange: "$90–$200",
      basePrice: 90,
      keywords: [
        "carpet",
        "steam",
        "stain",
        "rug",
        "deep clean",
        "stain removal",
        "quick dry",
      ],
    },
    {
      id: "window",
      name: "Window Cleaning",
      description:
        "Interior and exterior window cleaning, streak-free. High-rise capability for commercial buildings and multi-story homes.",
      icon: "🪟",
      priceRange: "$80–$180",
      basePrice: 80,
      keywords: [
        "window",
        "glass",
        "high-rise",
        "streak-free",
        "exterior",
        "interior",
      ],
    },
    {
      id: "deep",
      name: "Deep Cleaning",
      description:
        "Intensive top-to-bottom clean covering every corner. Behind appliances, inside cabinets, full sanitization. Ideal for seasonal refreshes.",
      icon: "✨",
      priceRange: "$300–$550",
      basePrice: 300,
      keywords: [
        "deep",
        "intensive",
        "spring clean",
        "thorough",
        "sanitization",
        "top to bottom",
        "appliance",
        "seasonal",
      ],
    },
    {
      id: "oven",
      name: "Oven Cleaning",
      description:
        "Professional oven cleaning and degreasing. Restores your oven to like-new condition with eco-friendly products.",
      icon: "🔥",
      priceRange: "$80–$150",
      basePrice: 80,
      keywords: ["oven", "degrease", "kitchen appliance", "eco-friendly"],
    },
    {
      id: "upholstery",
      name: "Upholstery Cleaning",
      description:
        "Fabric and leather upholstery cleaning for furniture. Removes stains, odours, and allergens.",
      icon: "🛋️",
      priceRange: "$100–$250",
      basePrice: 100,
      keywords: [
        "upholstery",
        "furniture",
        "couch",
        "sofa",
        "fabric",
        "leather",
        "allergen",
        "odour",
      ],
    },
  ],

  faqs: [
    {
      id: "faq-1",
      question: "What is your bond-back guarantee?",
      answer:
        "We guarantee that if your real estate agent or landlord is not satisfied with our end-of-lease clean, we will return and re-clean the property at no extra charge. This guarantee covers all our end-of-lease cleaning services and gives you peace of mind during the stressful moving process.",
      category: "policies",
      keywords: ["bond", "guarantee", "end of lease", "re-clean", "satisfaction"],
    },
    {
      id: "faq-2",
      question: "Are your staff police-checked and insured?",
      answer:
        "Yes. All AASTACLEAN team members undergo thorough police checks before joining our team. We are also fully insured with public liability insurance, so you can trust us in your home or business with complete confidence.",
      category: "policies",
      keywords: [
        "police check",
        "insured",
        "staff",
        "trusted",
        "liability",
        "background",
        "safe",
        "security",
      ],
    },
    {
      id: "faq-3",
      question: "Do you use eco-friendly products?",
      answer:
        "Yes, we prioritize eco-friendly, non-toxic cleaning products that are safe for your family, pets, and the environment. We can also use your preferred products if you have specific requirements.",
      category: "policies",
      keywords: [
        "eco",
        "friendly",
        "green",
        "non-toxic",
        "safe",
        "environment",
        "pet",
        "family",
        "product",
      ],
    },
    {
      id: "faq-4",
      question: "How do I book a cleaning service?",
      answer:
        "Booking is easy! You can: (1) Call us directly at 1300 AASTACLEAN, (2) Email us at hello@aastaclean.com.au, (3) Use our online booking form on the website, or (4) Send us a message through our AI Assistant. We typically respond within 1 hour during business hours.",
      category: "booking",
      keywords: [
        "book",
        "booking",
        "schedule",
        "appointment",
        "how",
        "order",
        "contact",
        "call",
        "email",
      ],
    },
    {
      id: "faq-5",
      question: "What are your business hours?",
      answer:
        "Our office hours are Monday to Friday, 7:00 AM – 7:00 PM (AEST), and Saturday 8:00 AM – 4:00 PM. We are closed on Sundays and public holidays. However, cleaning services can be scheduled outside these hours to suit your needs, including early mornings, evenings, and weekends.",
      category: "general",
      keywords: [
        "hours",
        "open",
        "time",
        "schedule",
        "when",
        "available",
        "monday",
        "weekend",
        "sunday",
      ],
    },
    {
      id: "faq-6",
      question: "How is pricing calculated?",
      answer:
        "Pricing depends on the type of service, property size, and any additional add-ons. Domestic cleaning starts from $120, end-of-lease from $250, commercial from $180, and deep cleaning from $300. We offer free quotes — just tell us about your property and requirements, and we'll provide a detailed estimate.",
      category: "pricing",
      keywords: [
        "price",
        "pricing",
        "cost",
        "how much",
        "quote",
        "estimate",
        "fee",
        "charge",
        "affordable",
        "cheap",
        "rate",
      ],
    },
    {
      id: "faq-7",
      question: "Do you offer regular/recurring cleaning services?",
      answer:
        "Yes! We offer weekly, fortnightly, and monthly cleaning plans for both domestic and commercial clients. Regular clients enjoy discounted rates and priority scheduling. Contact us to set up a recurring plan that fits your needs.",
      category: "booking",
      keywords: [
        "regular",
        "recurring",
        "weekly",
        "fortnightly",
        "monthly",
        "plan",
        "subscription",
        "ongoing",
        "repeat",
      ],
    },
    {
      id: "faq-8",
      question: "Which areas do you service?",
      answer:
        "We service all Australian states and territories. Our primary coverage includes major cities across WA (Perth, Fremantle, Joondalup, Rockingham), NSW (Sydney, Newcastle, Wollongong), VIC (Melbourne, Geelong), QLD (Brisbane, Gold Coast), SA (Adelaide), TAS (Hobart), NT (Darwin), and ACT (Canberra). Contact us to confirm coverage in your specific suburb.",
      category: "general",
      keywords: [
        "area",
        "service area",
        "location",
        "where",
        "suburb",
        "city",
        "state",
        "perth",
        "sydney",
        "melbourne",
        "brisbane",
        "adelaide",
        "coverage",
        "australia",
      ],
    },
    {
      id: "faq-9",
      question: "Can I get a free quote?",
      answer:
        "Absolutely! We provide free, no-obligation quotes for all our services. Simply tell us your service type, property size, and any special requirements, and we'll get back to you within 1 hour during business hours.",
      category: "pricing",
      keywords: [
        "free",
        "quote",
        "estimate",
        "cost",
        "no obligation",
        "how much",
        "price",
      ],
    },
    {
      id: "faq-10",
      question: "What add-on services do you offer?",
      answer:
        "We offer several add-ons including: window cleaning, carpet steam cleaning, oven cleaning, upholstery cleaning, wall washing, and laundry organization. Add-ons can be combined with any service for a comprehensive clean.",
      category: "services",
      keywords: [
        "add-on",
        "addon",
        "extra",
        "additional",
        "window",
        "carpet",
        "oven",
        "upholstery",
        "wall",
        "laundry",
      ],
    },
    {
      id: "faq-11",
      question: "Do you clean after construction or renovation?",
      answer:
        "Yes, we offer post-construction and post-renovation cleaning services. This includes removal of dust, debris, paint splatter, and construction residue. It's a thorough deep clean to make your newly renovated space move-in ready.",
      category: "services",
      keywords: [
        "construction",
        "renovation",
        "post-build",
        "builder clean",
        "new build",
        "renovate",
        "dust",
        "debris",
      ],
    },
    {
      id: "faq-12",
      question: "What is your cancellation policy?",
      answer:
        "We understand plans can change. You can cancel or reschedule your booking with at least 24 hours' notice at no charge. Cancellations within 24 hours may incur a small fee to cover scheduling costs.",
      category: "policies",
      keywords: [
        "cancel",
        "cancellation",
        "reschedule",
        "change",
        "notice",
        "fee",
        "policy",
      ],
    },
    {
      id: "faq-13",
      question: "Do I need to be home during the cleaning?",
      answer:
        "No, you don't need to be home. Many of our clients provide access (key, lockbox, or building manager) and we complete the clean while they're at work or away. We're fully insured and police-checked for your peace of mind.",
      category: "general",
      keywords: [
        "home",
        "present",
        "away",
        "key",
        "access",
        "need to be",
        "during",
      ],
    },
    {
      id: "faq-14",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods including credit/debit cards (Visa, Mastercard, AMEX), bank transfers, and PayID. Payment is typically due within 7 days of service completion for commercial clients, and on the day of service for domestic clients.",
      category: "pricing",
      keywords: [
        "payment",
        "pay",
        "card",
        "credit",
        "bank",
        "transfer",
        "method",
        "invoice",
      ],
    },
    {
      id: "faq-15",
      question: "How do I contact AASTACLEAN?",
      answer:
        "You can reach us by phone at 1300 AASTACLEAN, email at hello@aastaclean.com.au, or through the online contact form on our website. Our AI Assistant is also available 24/7 to answer common questions.",
      category: "general",
      keywords: [
        "contact",
        "reach",
        "phone",
        "email",
        "call",
        "get in touch",
        "support",
        "help",
      ],
    },
  ],

  policies: [
    {
      id: "policy-1",
      title: "Bond-Back Guarantee",
      description:
        "If your real estate agent or landlord is not satisfied with our end-of-lease clean, we will return and re-clean at no extra charge. This is our commitment to your complete satisfaction.",
      keywords: ["bond", "guarantee", "end of lease", "satisfaction", "re-clean"],
    },
    {
      id: "policy-2",
      title: "Police-Checked Staff",
      description:
        "Every AASTACLEAN team member undergoes a thorough police check before joining. Your safety and security in your home is our top priority.",
      keywords: ["police check", "staff", "security", "safety", "background", "trusted"],
    },
    {
      id: "policy-3",
      title: "Fully Insured",
      description:
        "AASTACLEAN carries comprehensive public liability insurance. In the rare event of any damage during our service, you are fully covered.",
      keywords: ["insured", "insurance", "liability", "damage", "covered", "protection"],
    },
    {
      id: "policy-4",
      title: "Eco-Friendly Products",
      description:
        "We prioritize non-toxic, environmentally responsible cleaning products that are safe for families, pets, and the planet.",
      keywords: ["eco", "friendly", "green", "non-toxic", "environment", "safe", "pet"],
    },
    {
      id: "policy-5",
      title: "24-Hour Cancellation",
      description:
        "Cancel or reschedule with at least 24 hours' notice at no charge. Late cancellations (within 24 hours) may incur a small fee.",
      keywords: [
        "cancel",
        "cancellation",
        "reschedule",
        "change",
        "notice",
        "policy",
        "fee",
      ],
    },
    {
      id: "policy-6",
      title: "Satisfaction Guarantee",
      description:
        "If you're not completely happy with our service, contact us within 24 hours and we'll make it right. Your satisfaction is our priority.",
      keywords: [
        "satisfaction",
        "guarantee",
        "happy",
        "complaint",
        "quality",
        "right",
      ],
    },
  ],

  serviceAreas: [
    {
      state: "Western Australia",
      cities: [
        "Perth",
        "Fremantle",
        "Joondalup",
        "Rockingham",
        "Mandurah",
        "Armadale",
        "Midland",
        "Scarborough",
        "Subiaco",
        "West Leederville",
        "Nedlands",
        "Cottesloe",
        "Claremont",
      ],
    },
    {
      state: "New South Wales",
      cities: [
        "Sydney",
        "Newcastle",
        "Wollongong",
        "Parramatta",
        "Bondi",
        "Manly",
        "Chatswood",
        "Liverpool",
        "Penrith",
        "Cronulla",
      ],
    },
    {
      state: "Victoria",
      cities: [
        "Melbourne",
        "Geelong",
        "Ballarat",
        "Bendigo",
        "St Kilda",
        "Richmond",
        "Brighton",
        "Southbank",
        "Docklands",
        "Hawthorn",
      ],
    },
    {
      state: "Queensland",
      cities: [
        "Brisbane",
        "Gold Coast",
        "Sunshine Coast",
        "Cairns",
        "Townsville",
        "Ipswich",
        "Toowoomba",
        "Southport",
        "Surfers Paradise",
      ],
    },
    {
      state: "South Australia",
      cities: [
        "Adelaide",
        "Glenelg",
        "North Adelaide",
        "Prospect",
        "Unley",
        "Norwood",
        "Brighton",
        "Semaphore",
      ],
    },
    {
      state: "Tasmania",
      cities: ["Hobart", "Launceston", "Devonport", "Kingston", "Glenorchy"],
    },
    {
      state: "Northern Territory",
      cities: ["Darwin", "Palmerston", "Alice Springs", "Katherine"],
    },
    {
      state: "Australian Capital Territory",
      cities: ["Canberra", "Belconnen", "Woden", "Gungahlin", "Tuggeranong"],
    },
  ],

  bookingSteps: [
    {
      step: 1,
      title: "Choose Your Service",
      description:
        "Select from our range of domestic, commercial, end-of-lease, carpet, window, or deep cleaning services.",
    },
    {
      step: 2,
      title: "Get a Free Quote",
      description:
        "Tell us about your property and requirements. We'll provide a detailed, no-obligation estimate within 1 hour.",
    },
    {
      step: 3,
      title: "Schedule Your Clean",
      description:
        "Pick a date and time that works for you. We offer flexible scheduling including early mornings, evenings, and weekends.",
    },
    {
      step: 4,
      title: "Confirm Your Booking",
      description:
        "Review the quote, confirm your booking details, and we'll assign a trusted, police-checked team to your job.",
    },
    {
      step: 5,
      title: "Enjoy Your Clean Space",
      description:
        "Our team arrives on time, completes the clean to our high standards, and leaves your space spotless. Backed by our satisfaction guarantee.",
    },
  ],

  contactInfo: {
    phone: "1300 AASTACLEAN",
    email: "hello@aastaclean.com.au",
    hours: "Mon–Fri 7AM–7PM, Sat 8AM–4PM (AEST)",
    address: "Perth, Western Australia, Australia",
  },
};
