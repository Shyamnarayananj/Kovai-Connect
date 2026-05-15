export type Business = {
  id: string;
  name: string;
  category: string;
  area: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  image: string;
  tagline: string;
  about: string;
  services: string[];
  gallery: string[];
  phone: string;
  email: string;
  address: string;
  social: { instagram?: string; facebook?: string; whatsapp?: string };
  reviews: { name: string; rating: number; text: string }[];
};

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

export const categories = [
  { slug: "bakers", title: "Bakers", desc: "Home bakers & cake artists", icon: "🍰" },
  { slug: "doctors", title: "Doctors", desc: "Trusted clinics & specialists", icon: "🩺" },
  { slug: "lawyers", title: "Lawyers", desc: "Legal advice & advocates", icon: "⚖️" },
  { slug: "tailors", title: "Tailors", desc: "Custom stitching & boutiques", icon: "🧵" },
  { slug: "grocery", title: "Grocery Stores", desc: "Daily essentials nearby", icon: "🛒" },
  { slug: "startups", title: "Startups", desc: "Tech, food-tech & ventures", icon: "🚀" },
  { slug: "architects", title: "Architects", desc: "Design & planning experts", icon: "📐" },
  { slug: "chartered-accountants", title: "CAs", desc: "Tax & audit professionals", icon: "📊" },
];

export const businesses: Business[] = [
  {
    id: "kovai-crust-bakers",
    name: "Kovai Crust Bakers",
    category: "Bakers",
    area: "RS Puram",
    rating: 4.8,
    reviewCount: 142,
    verified: true,
    image: img("photo-1509440159596-0249088772ff"),
    tagline: "Artisan sourdough & celebration cakes baked from home.",
    about:
      "A home-grown bakery in the heart of RS Puram, run by chef Anitha. Every loaf is naturally fermented for 24 hours and every cake is made to order with locally sourced ingredients.",
    services: ["Custom Cakes", "Sourdough Loaves", "Cookie Hampers", "Corporate Orders"],
    gallery: [
      img("photo-1486427944299-d1955d23e34d"),
      img("photo-1464195244916-405fa0a82545"),
      img("photo-1535920527002-b35e96722eb9"),
    ],
    phone: "+91 98765 43210",
    email: "hello@kovaicrust.in",
    address: "12, Trichy Road, RS Puram, Coimbatore 641002",
    social: { instagram: "#", facebook: "#", whatsapp: "#" },
    reviews: [
      { name: "Priya R.", rating: 5, text: "Best red velvet in Kovai!" },
      { name: "Karthik M.", rating: 5, text: "Sourdough is perfectly tangy." },
    ],
  },
  {
    id: "dr-meera-care",
    name: "Dr. Meera Family Clinic",
    category: "Doctors",
    area: "Saibaba Colony",
    rating: 4.9,
    reviewCount: 318,
    verified: true,
    image: img("photo-1576091160550-2173dba999ef"),
    tagline: "Compassionate family medicine for every generation.",
    about:
      "Dr. Meera has been serving Saibaba Colony families for over 15 years, with a focus on preventive care, paediatrics, and women's health.",
    services: ["General Consultation", "Paediatrics", "Vaccinations", "Health Check-ups"],
    gallery: [img("photo-1519494026892-80bbd2d6fd0d"), img("photo-1551601651-2a8555f1a136")],
    phone: "+91 90000 11222",
    email: "clinic@drmeera.in",
    address: "Sai Towers, Saibaba Colony, Coimbatore 641011",
    social: { whatsapp: "#" },
    reviews: [{ name: "Sundar V.", rating: 5, text: "Patient and thorough." }],
  },
  {
    id: "advocate-raghav",
    name: "Raghav & Associates",
    category: "Lawyers",
    area: "Race Course",
    rating: 4.6,
    reviewCount: 76,
    verified: true,
    image: img("photo-1505664194779-8beaceb93744"),
    tagline: "Civil, corporate & property law, simplified.",
    about:
      "A boutique legal practice handling property disputes, MSME contracts, and family matters across Tamil Nadu courts.",
    services: ["Property Law", "Corporate Contracts", "Family Law", "Notary"],
    gallery: [img("photo-1589994965851-a8f479c573a9")],
    phone: "+91 99887 76655",
    email: "office@raghavlaw.in",
    address: "44, Race Course Road, Coimbatore 641018",
    social: {},
    reviews: [{ name: "Lakshmi S.", rating: 5, text: "Clear, honest counsel." }],
  },
  {
    id: "anjali-tailoring",
    name: "Anjali Boutique & Tailoring",
    category: "Tailors",
    area: "Gandhipuram",
    rating: 4.7,
    reviewCount: 211,
    verified: false,
    image: img("photo-1558769132-cb1aea458c5e"),
    tagline: "Bridal blouses & everyday stitching, perfectly fitted.",
    about:
      "Three generations of tailors serving Gandhipuram. Specialists in bridal blouses, kurtas, and alterations with 48-hour turnaround.",
    services: ["Blouse Stitching", "Kurta & Salwar", "Alterations", "Bridal Wear"],
    gallery: [img("photo-1515886657613-9f3515b0c78f")],
    phone: "+91 94444 55667",
    email: "anjali.tailors@kovai.in",
    address: "Cross Cut Road, Gandhipuram, Coimbatore 641012",
    social: { instagram: "#" },
    reviews: [{ name: "Divya P.", rating: 5, text: "Perfect bridal blouse fit!" }],
  },
  {
    id: "kovai-fresh-mart",
    name: "Kovai Fresh Mart",
    category: "Grocery Stores",
    area: "Peelamedu",
    rating: 4.4,
    reviewCount: 89,
    verified: true,
    image: img("photo-1542838132-92c53300491e"),
    tagline: "Daily essentials & farm-fresh produce, doorstep delivery.",
    about:
      "Neighbourhood grocer offering organic vegetables, millets, and pantry staples with same-day delivery within 5 km.",
    services: ["Groceries", "Fresh Produce", "Home Delivery", "Bulk Orders"],
    gallery: [img("photo-1488459716781-31db52582fe9")],
    phone: "+91 98430 12345",
    email: "orders@kovaifresh.in",
    address: "PSG Road, Peelamedu, Coimbatore 641004",
    social: { whatsapp: "#" },
    reviews: [{ name: "Ramesh K.", rating: 4, text: "Fresh and prompt delivery." }],
  },
  {
    id: "byteforge-labs",
    name: "ByteForge Labs",
    category: "Startups",
    area: "Tidel Park",
    rating: 4.9,
    reviewCount: 54,
    verified: true,
    image: img("photo-1519389950473-47ba0277781c"),
    tagline: "AI-powered logistics, built in Coimbatore for India.",
    about:
      "A SaaS startup helping textile exporters automate dispatch and tracking. YC-backed, hiring across engineering and design.",
    services: ["SaaS Platform", "AI Routing", "API Integrations", "Onboarding"],
    gallery: [img("photo-1551434678-e076c223a692")],
    phone: "+91 80000 90909",
    email: "hello@byteforge.dev",
    address: "Tidel Park, Vilankurichi Road, Coimbatore 641014",
    social: { instagram: "#", facebook: "#" },
    reviews: [{ name: "Arjun T.", rating: 5, text: "Game changer for our exports." }],
  },
  {
    id: "studio-veedu",
    name: "Studio Veedu Architects",
    category: "Architects",
    area: "Avinashi Road",
    rating: 4.8,
    reviewCount: 63,
    verified: true,
    image: img("photo-1487958449943-2429e8be8625"),
    tagline: "Climate-responsive homes rooted in Tamil tradition.",
    about:
      "Award-winning practice designing courtyard homes, weekend villas, and adaptive reuse projects across Kongu region.",
    services: ["Residential Design", "Interiors", "3D Visualisation", "Project Management"],
    gallery: [img("photo-1503387762-592deb58ef4e")],
    phone: "+91 95000 22334",
    email: "studio@veedu.in",
    address: "Avinashi Road, Coimbatore 641018",
    social: { instagram: "#" },
    reviews: [{ name: "Hari P.", rating: 5, text: "Beautifully thoughtful design." }],
  },
  {
    id: "sundar-ca",
    name: "Sundar & Co. CAs",
    category: "Chartered Accountants",
    area: "Town Hall",
    rating: 4.7,
    reviewCount: 102,
    verified: true,
    image: img("photo-1454165804606-c3d57bc86b40"),
    tagline: "GST, audit & MSME tax planning made simple.",
    about:
      "Trusted by 400+ Coimbatore MSMEs for tax filings, audits, and business advisory. Transparent pricing, monthly reports.",
    services: ["GST Filing", "Statutory Audit", "MSME Advisory", "Income Tax"],
    gallery: [],
    phone: "+91 99421 33445",
    email: "office@sundarca.in",
    address: "Town Hall, Coimbatore 641001",
    social: {},
    reviews: [{ name: "Meena R.", rating: 5, text: "Saved us lakhs in tax planning." }],
  },
];

export const plans = [
  {
    name: "Basic",
    price: "₹499",
    period: "/month",
    tagline: "Get listed and discovered.",
    features: [
      "Business profile page",
      "Single category listing",
      "Area tagging for SEO",
      "Up to 5 inquiries/month",
    ],
    recommended: false,
  },
  {
    name: "Standard",
    price: "₹999",
    period: "/month",
    tagline: "Grow inquiries with trust signals.",
    features: [
      "Everything in Basic",
      "Verified Trust Badge",
      "Up to 3 categories",
      "Unlimited inquiries",
      "Monthly performance report",
    ],
    recommended: true,
  },
  {
    name: "Premium",
    price: "₹1,999",
    period: "/month",
    tagline: "Full digital marketing engine.",
    features: [
      "Everything in Standard",
      "Featured homepage placement",
      "Social media promotion (4 posts/mo)",
      "Lead management dashboard",
      "Dedicated account manager",
    ],
    recommended: false,
  },
];

export const testimonials = [
  {
    name: "Anitha R.",
    business: "Kovai Crust Bakers",
    text: "KovaiConnect tripled my weekend cake orders within two months. The Trust Badge really works!",
  },
  {
    name: "Dr. Meera",
    business: "Family Clinic, Saibaba Colony",
    text: "Patients now find us on Google through KovaiConnect. The inquiry form is a delight to use.",
  },
  {
    name: "Karthik M.",
    business: "ByteForge Labs",
    text: "We hired 4 interns from KovaiConnect's local network. Their commitment to MSMEs is real.",
  },
];