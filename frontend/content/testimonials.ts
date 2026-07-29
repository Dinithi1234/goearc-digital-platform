export type Testimonial = {
  id: string;
  name: string;
  location: string;
  shortQuote: string;
  fullQuote: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "valentinenia-omero",
    name: "Valentinenia O.",
    location: "Richmond Hill, Ontario",
    shortQuote:
      "The Garden of Eden gave me my peace of mind back and helped transform our home into a safe, thriving sanctuary.",
    fullQuote:
      "Before coming to the Garden of Eden Retreat Center, I believed our family's struggles with autism and chronic stress were permanent roadblocks. The GOEARC team gave me practical strategies to manage daily challenges, set boundaries, and prioritize self-care without guilt. Today, I feel grounded, equipped, and hopeful.",
    image: "/images/testimonials/valentinenia-omero.jpeg",
    imageAlt: "Portrait of Valentinenia O.",
    featured: true,
  },

  {
    id: "keisha-annlee",
    name: "Keisha A.",
    location: "Burlington, Ontario",
    shortQuote:
      "I learned how to break free from chronic stress and limiting beliefs.",
    fullQuote:
      "Before finding Garden of Eden, I felt completely trapped by our daily routine. While my child participated in therapeutic nature activities, I attended mindfulness sessions that helped me approach life with greater calm and clarity.",
    image: "/images/testimonials/keisha-annlee.jpeg",
    imageAlt: "Portrait of Keisha Annlee",
  },

  {
    id: "andrea-nagy",
    name: "Andrea N.",
    location: "North York, Ontario",
    shortQuote:
      "I arrived at Garden of Eden completely broken. I left with the power to change my life.",
    fullQuote:
      "I arrived at Garden of Eden completely broken. I left with the power to change my life.",
    image: "/images/testimonials/andrea-nagy.jpeg",
    imageAlt: "Portrait of Andrea Nagy",
  },

  {
    id: "idrissa-lomba",
    name: "Idrissa L.",
    location: "Mississauga, Ontario",
    shortQuote:
      "I moved from simply surviving to believing that our family could thrive.",
    fullQuote:
      "I left the retreat a completely different parent. I replaced a fixed mindset of just surviving with a growth mindset focused on thriving. I now have practical tools to improve our home environment and face challenges with resilience.",
    image: "/images/testimonials/idrissa-lomba.jpeg",
    imageAlt: "Portrait of Idrissa Lomba",
  },

  {
    id: "heather-lee",
    name: "Heather L.",
    location: "North York, Ontario",
    shortQuote:
      "For the first time, I felt understood rather than managed.",
    fullQuote:
      "The GOEARC team met me with acceptance and actionable understanding. They gave me practical strategies to manage sensory energy, navigate overwhelm, and advocate for my needs. I left with lower anxiety, greater confidence, and a stronger sense of empowerment.",
    image: "/images/testimonials/heather-lee.jpg",
    imageAlt: "Portrait of Heather Lee",
  },

  {
    id: "hoda",
    name: "Hoda",
    location: "Scarborough–East York, Ontario",
    shortQuote:
      "GOEARC gave our family a beautiful path forward.",
    fullQuote:
      "Before finding GOEARC, I felt trapped in constant survival mode. Through family coaching and therapeutic programs, I learned how to manage daily stress, support sensory needs, and practise self-care without guilt. Today, our home feels calmer, safer, and more hopeful.",
    image: "/images/testimonials/hoda.jpeg",
    imageAlt: "Portrait of Hoda",
  },

  {
    id: "annabelle-wallnau",
    name: "Annabelle W.",
    location: "Dallas, Texas",
    shortQuote:
      "The article gave me hope and reminded me that families do not have to walk this journey alone.",
    fullQuote:
      "Dr. Amy's article helped me shift my perspective from burnout and fear to hope and growth. It reminded me that there is support available and that families deserve compassion, understanding, and practical guidance.",
    image: "/images/testimonials/annabelle-wallnau.jpg",
    imageAlt: "Portrait of Annabelle Wallnau",
  },
];