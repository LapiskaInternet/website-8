export const CONTACT = {
  phoneDisplay: "064 959 4490",
  phoneTel: "tel:+27649594490",
  whatsappNumber: "27649594490",
  whatsapp: "https://wa.me/27649594490",
  email: "banhutours@gmail.com",
  emailHref: "mailto:banhutours@gmail.com",
  address:
    "Mount Lapiska, Canhuk Drive, Acornhoek, Mpumalanga, South Africa",
  hours: "Mon–Sat 6:00 AM – 6:00 PM",
  cipc: "CIPC 2026/020289/07",
  sars: "SARS 9229491288",
};

export function whatsappLink(message: string): string {
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const ADDONS: AddOn[] = [
  {
    id: "acornhoek-nightlife",
    name: "Acornhoek Nightlife",
    description:
      "Local taverns, live music and village nightlife with a guide who knows every corner.",
    image: "/images/addon-acornhoek-nightlife.png",
  },
  {
    id: "mariepskop-heritage",
    name: "Mariepskop Heritage Tour",
    description:
      "A guided ascent of Mariepskop for golden sunrise or sunset views over the Lowveld.",
    image: "/images/addon-mariepskop-heritage.png",
  },
  {
    id: "moloro-rural-walk",
    name: "Moloro Rural Walk",
    description:
      "A gentle village walk — rural traditions, local crafts and warm hospitality.",
    image: "/images/addon-moloro-rural-walk.png",
  },
  {
    id: "boma-storytelling",
    name: "Storytelling on Boma Fire",
    description:
      "An evening around the fire as elders share Shangane stories, food and song.",
    image: "/images/addon-boma-storytelling.png",
  },
  {
    id: "mpisane-battle-site",
    name: "Mpisane Battle Site Tour",
    description:
      "Walk the historic Mpisane battle site with local storytellers and heritage experts.",
    image: "/images/addon-mpisane-battle-site.png",
  },
  {
    id: "motsepadi-sacred-walk",
    name: "Motsepadi Sacred Cultural Walk",
    description:
      "A sacred cultural walk through Motsepadi village — ancestors, rituals and living heritage.",
    image: "/images/addon-motsepadi-sacred-walk.png",
  },
];

export interface TourPackage {
  id: string;
  name: string;
  duration: string;
  description: string;
  highlights: string[];
  image: string;
}

export const PACKAGES: TourPackage[] = [
  {
    id: "highveld-lowveld",
    name: "Highveld to Lowveld",
    duration: "5-7 days",
    description:
      "Descend from the cool Highveld grasslands, down the escarpment and into the warm bushveld of the Lowveld — waterfalls, viewpoints and village hospitality along one of South Africa's most scenic corridors.",
    highlights: [
      "Middelburg & Standerton Highveld start",
      "Waterval Boven falls & tunnels",
      "Panorama Route — God's Window & Bourke's Luck Potholes",
      "Graskop & Pilgrim's Rest",
      "Acornhoek village welcome",
    ],
    image: "/images/package-highveld-lowveld.jpg",
  },
  {
    id: "maputo-acornhoek",
    name: "Maputo to Acornhoek",
    duration: "4-6 days",
    description:
      "A cross-border adventure from Mozambique's coastline to the heart of the Lowveld — swap the ocean breeze for bushveld sunsets and finish with a cultural homecoming in Acornhoek.",
    highlights: [
      "Maputo city departure",
      "Komatipoort border crossing",
      "Nelspruit (Mbombela) stopover",
      "Kruger fringe game viewing",
      "Motsepadi cultural home-stay",
    ],
    image: "/images/package-maputo-acornhoek.jpg",
  },
  {
    id: "swaziland-acornhoek",
    name: "Swaziland to Acornhoek",
    duration: "3-5 days",
    description:
      "From the hills and craft markets of the Kingdom of Eswatini into Mpumalanga's wild Lowveld — a short but rich journey linking two proud cultures and landscapes.",
    highlights: [
      "Mbabane & Manzini craft markets",
      "Barberton & the Makhonjwa Mountains",
      "Nelspruit (Mbombela)",
      "Bushbuckridge villages",
      "Heritage storytelling evening",
    ],
    image: "/images/package-swaziland-acornhoek.jpg",
  },
  {
    id: "heritage-package",
    name: "Heritage Tours Package",
    duration: "6-8 days",
    description:
      "Our signature heritage circuit through the towns and landmarks that shaped Mpumalanga — guided at every stop by local storytellers and heritage experts.",
    highlights: [
      "Acornhoek & Bushbuckridge",
      "Panorama Route & Graskop",
      "Nelspruit (Mbombela)",
      "Waterval Boven",
      "Middelburg & Standerton",
      "Barberton heritage sites",
    ],
    image: "/images/package-heritage.jpg",
  },
];

export interface RegionalItineraryStop {
  day: string;
  time: string;
  activity: string;
  detail: string;
}

export interface RegionalPackage {
  id: string;
  name: string;
  audience: string;
  base: string;
  duration: string;
  groupPrice: number; // ZAR per person, group tier (10+ pax)
  fitPrice: number; // ZAR per person, FIT tier
  inclusions: string;
  image: string;
  itinerary: RegionalItineraryStop[];
}

/** Five structured packages from the Acornhoek Regional Master Portfolio. */
export const REGIONAL_PACKAGES: RegionalPackage[] = [
  {
    id: "authentic-heritage",
    name: "The Authentic Heritage & Culture Package",
    audience:
      "Cultural tourists, educational groups, and inbound international heritage seekers.",
    base: "Moropa Lodge & Local Village Guest Houses",
    duration: "3 days",
    groupPrice: 4800,
    fitPrice: 5900,
    inclusions: "Full board (B, L, D) · All cultural site fees & Munene Gallery",
    image: "/images/package-heritage.jpg",
    itinerary: [
      {
        day: "Day 1",
        time: "09:00 – 12:00",
        activity: "Arrival & Traditional Welcome",
        detail:
          "Check-in at Moropa Lodge. Enjoy a welcome beverage crafted from indigenous wild fruits. Complete orientation briefing.",
      },
      {
        day: "Day 1",
        time: "15:00 – 18:00",
        activity: "Shangaan Traditional Dancers & Dinner",
        detail:
          "Vibrant open-air dance performance highlighting local choreography. Followed by a communal culinary buffet.",
      },
      {
        day: "Day 2",
        time: "08:30 – 11:30",
        activity: "Mapusha Weavers Masterclass",
        detail:
          "Interactive workshop directly with the community weavers. Learn traditional spinning and intricate pattern theory.",
      },
      {
        day: "Day 2",
        time: "12:00 – 14:30",
        activity: "Munene Art Gallery Curated Tour",
        detail:
          "Guided fine arts tour showcasing local paintings, sculptures, and historical narratives. Meet-and-greet with the artists.",
      },
      {
        day: "Day 2",
        time: "16:00 – 19:30",
        activity: "Traditional Storytelling Circle",
        detail:
          "Evening open-fire interactive dialogue led by community elders detailing the rich defensive histories of the Batau.",
      },
      {
        day: "Day 3",
        time: "09:00 – 13:00",
        activity: "Nyani Cultural Village Excursion",
        detail:
          "Immersive theater production and walk-through of a fully reconstructed historical village layout. Lunch included.",
      },
    ],
  },
  {
    id: "fused-luxury",
    name: "The Modern Fused Culture & Leisure Package",
    audience:
      "Premium weekenders, corporate retreats, and leisure-oriented holidaymakers.",
    base: "Masingitana Tented Safari (Premium Canvas Luxury)",
    duration: "3 days",
    groupPrice: 9500,
    fitPrice: 11200,
    inclusions: "Full board (B, L, D) · Masingitana Safari + Boat Cruise",
    image: "/images/regional-fused-luxury.jpg",
    itinerary: [
      {
        day: "Day 1",
        time: "14:00 – 16:30",
        activity: "Luxury Tented Check-in & High Tea",
        detail:
          "Check-in at Masingitana Tented Safari. Settle into luxury canvas suites. Premium bush-side afternoon high tea served.",
      },
      {
        day: "Day 1",
        time: "18:00 – 21:30",
        activity: "Boma Fire Storytelling & Fine Dining",
        detail:
          "Crackling fire pits under the stars. Fused modern-traditional culinary dinner paired with light historical storytelling.",
      },
      {
        day: "Day 2",
        time: "09:00 – 13:00",
        activity: "Blyde River Canyon Scenic Highlights",
        detail:
          "Air-conditioned luxury shuttle transport to the Three Rondavels and God's Window for panorama photography sessions.",
      },
      {
        day: "Day 2",
        time: "14:30 – 17:00",
        activity: "Blyde Dam Interpretive Boat Cruise",
        detail:
          "Water-based cruise viewing the Kadishi Tufa Waterfall ('weeping face of nature'). Spot crocodiles and hippos from the water.",
      },
      {
        day: "Day 3",
        time: "07:30 – 11:30",
        activity: "Andover Nature Reserve Drive",
        detail:
          "Relaxed self-drive or open-vehicle safari through Andover's road networks focusing on plains game (giraffe, zebra, buck).",
      },
    ],
  },
  {
    id: "two-villages",
    name: "The 'Two Villages, One Story' Joint Track",
    audience:
      "Philanthropic travelers, cross-border trade delegates, and community development tourists.",
    base: "Decentralised Village Guest Houses & Community Hubs",
    duration: "3 days",
    groupPrice: 3200,
    fitPrice: 3950,
    inclusions: "Dinner & breakfast (B, D) · Community guides & workshops",
    image: "/images/regional-two-villages.jpg",
    itinerary: [
      {
        day: "Day 1",
        time: "10:00 – 13:00",
        activity: "Bilateral Community Welcome",
        detail:
          "Arrive at the initial host village. Formal orientation led by local operators covering cross-border community-based design.",
      },
      {
        day: "Day 1",
        time: "15:00 – 18:00",
        activity: "Interactive Dialogue & Crafts",
        detail:
          "Walk through the local artisan stalls. Direct engagement with craft makers under a custom 'Buy and Improve' framework.",
      },
      {
        day: "Day 2",
        time: "09:00 – 12:30",
        activity: "Guided Heritage Trail Walk",
        detail:
          "Foot safari traversing shared historical pathways, focusing on ancient migrations, defensive rock shelters, and caches.",
      },
      {
        day: "Day 2",
        time: "13:30 – 16:30",
        activity: "Joint Village Storytelling Session",
        detail:
          "Gathering of elders from two distinct areas to recount the joint history and oral epics of the Mapulana and Batau.",
      },
      {
        day: "Day 3",
        time: "08:30 – 11:30",
        activity: "SMME Exchange & Departure",
        detail:
          "Final networking breakfast highlighting local micro-enterprises and sustainable youth employment programs.",
      },
    ],
  },
  {
    id: "highveld-lowveld-corridor",
    name: "The 'Highveld Wild to Lowveld Soul' Corridor Package",
    audience: "Extended safari enthusiasts, photographers, and scenery lovers.",
    base: "Escarpment Lodge (Night 1) & Manyeleti Main Camp (Night 2)",
    duration: "3 days",
    groupPrice: 7600,
    fitPrice: 8800,
    inclusions: "Full board (B, L, D) · All reserve fees & Manyeleti drives",
    image: "/images/package-highveld-lowveld.jpg",
    itinerary: [
      {
        day: "Day 1",
        time: "08:00 – 13:00",
        activity: "Panorama Route Escarpment Tour",
        detail:
          "Explore Highveld edges. Visit Bourke's Luck Potholes, God's Window, and Echo Caves. High altitude mountain climate.",
      },
      {
        day: "Day 1",
        time: "15:00 – 18:30",
        activity: "Descent to Lowveld Savanna",
        detail:
          "Scenic drive descending the Drakensberg escarpment down into the warmer, dense bushveld. Check into Manyeleti Main Camp.",
      },
      {
        day: "Day 2",
        time: "05:30 – 09:30",
        activity: "Big 5 Open-Vehicle Game Drive",
        detail:
          "Early morning safari in Manyeleti Game Reserve. Fenceless border with Kruger allows free-roaming lions, leopards, rhinos.",
      },
      {
        day: "Day 2",
        time: "14:00 – 16:30",
        activity: "Avian & Raptor Bird Watching",
        detail:
          "Guided spotting session near the central waterholes looking for rare species such as the red-listed Kori Bustard.",
      },
      {
        day: "Day 2",
        time: "17:00 – 20:00",
        activity: "Night Safari & Place of Stars",
        detail:
          "Night drive using trackers and spotlights to view nocturnal predators, followed by stargazing in the pristine bushveld sky.",
      },
      {
        day: "Day 3",
        time: "08:00 – 11:00",
        activity: "Guided Morning Bush Walk",
        detail:
          "On-foot tracking exploration with armed, highly experienced field rangers focusing on ecosystem intricacies.",
      },
    ],
  },
  {
    id: "bushveld-adventure",
    name: "The Bushveld Adventure & Eco-Exchange Package",
    audience: "Thrill-seekers, active travelers, and eco-adventure groups.",
    base: "Andover Campsite & Self-Catering Units",
    duration: "3 days",
    groupPrice: 5400,
    fitPrice: 6300,
    inclusions:
      "Self-catering support / Boma dinner · Quads, 4x4, Horse Riding",
    image: "/images/regional-bushveld-adventure.jpg",
    itinerary: [
      {
        day: "Day 1",
        time: "13:00 – 17:00",
        activity: "Buffaloland Quad Bike Safari",
        detail:
          "All-terrain quad bike trail navigating rugged bush tracks. Guided wildlife viewing getting close to giraffe and zebra.",
      },
      {
        day: "Day 2",
        time: "07:00 – 14:00",
        activity: "Mariepskop Mountain 4x4 Trail",
        detail:
          "Rugged high-clearance 4x4 ascent up Mariepskop Mountain. Experience changing biomes from bushveld to mist forest.",
      },
      {
        day: "Day 2",
        time: "15:30 – 18:00",
        activity: "Moholoholo Rehabilitation Centre",
        detail:
          "Educational interactive tour of the wildlife rehab center. Learn about raptor and large predator rescue operations.",
      },
      {
        day: "Day 3",
        time: "08:00 – 11:30",
        activity: "Octopus Horse Riding Eco-Safari",
        detail:
          "Unobtrusive, silent horseback safari tracking plains game through natural paths. Incredible close-up wildlife encounters.",
      },
      {
        day: "Day 3",
        time: "13:00 – 15:30",
        activity: "Andover Ranger Bush Walk",
        detail:
          "Final active foot patrol with local rangers. Learn basic survival skills, spoor tracking, and indigenous flora medicine.",
      },
    ],
  },
];

/** Format ZAR prices the way the master portfolio prints them (R 4,800). */
export function zar(amount: number): string {
  return `R ${amount.toLocaleString("en-US")}`;
}

export const STRATEGIC_PARTNERS = [
  "Acorn Art Hub",
  "Tilali Information Centre",
  "Lapiska Internet Café",
  "Shobiyane High School",
  "Powerline Primary School",
  "Bushbuckridge Tourism",
  "SASEDA Business Forum",
  "Kamikaze Security",
];

export const AIRPORTS = [
  "Eastgate Airport (Hoedspruit)",
  "Kruger Mpumalanga International (Mbombela)",
  "Skukuza Airport",
  "OR Tambo (Johannesburg) & Maputo",
];

export const SHUTTLES = [
  "Acornhoek, Hoedspruit & Bushbuckridge routes",
  "Panorama Route & Kruger Park connections",
  "Group & event transport",
  "Comfortable minibuses, experienced local drivers",
];

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#add-ons", label: "Add-On Tours" },
  { href: "#packages", label: "Packages" },
  { href: "#services", label: "Services" },
  { href: "#events", label: "Events" },
  { href: "#community", label: "Community" },
  { href: "#contact", label: "Contact" },
];
