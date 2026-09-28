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
