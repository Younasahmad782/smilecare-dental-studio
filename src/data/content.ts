import type { Faq } from "@/types";

export const homeFaqs: Faq[] = [
  { q: "How do I book an appointment?", a: "Use the appointment form, message the clinic on WhatsApp or call during opening hours. Your request is an enquiry; the clinic confirms the time with you directly." },
  { q: "What dental services are available?", a: "General dentistry, cleaning and scaling, whitening, root canal treatment, implants, braces, cosmetic dentistry, crowns and bridges, extractions, children's dentistry, gum treatment and dentures." },
  { q: "How often should I visit a dentist?", a: "Many people are advised to attend every six to twelve months, but your dentist will recommend an interval based on your oral health." },
  { q: "Is professional teeth cleaning important?", a: "Yes. Professional cleaning removes plaque and tartar that brushing cannot, and supports gum health alongside good home care." },
  { q: "Do you provide children's dental care?", a: "Yes, pediatric dentistry is part of the services listed on this site. A first visit is often recommended when the first tooth appears." },
  { q: "How can I contact the clinic?", a: "Use the Contact page, WhatsApp, phone or email. All clinic details on this demonstration are samples and should be replaced for a real clinic." },
];

export const whyChoose = [
  { icon: "stethoscope", title: "Experienced Dental Professionals", text: "A team of qualified dentists across general and specialist care (sample claim, editable)." },
  { icon: "cpu", title: "Modern Dental Technology", text: "Contemporary diagnostics and equipment to support accurate, comfortable care (sample claim, editable)." },
  { icon: "heart", title: "Patient-Focused Care", text: "Unhurried appointments where your questions and concerns come first." },
  { icon: "armchair", title: "Comfortable Environment", text: "A calm, clean clinic designed to put nervous patients at ease." },
  { icon: "clipboard", title: "Personalized Treatment Plans", text: "Clear options explained in plain language, so you can decide what is right for you." },
  { icon: "calendar", title: "Convenient Appointment Booking", text: "Request a visit online or on WhatsApp, at a time that suits you." },
] as const;

export const testimonials = [
  { name: "Sample Patient A", city: "Lahore", text: "The team explained every step before starting, and I never felt rushed." },
  { name: "Sample Patient B", city: "Lahore", text: "Booking over WhatsApp was easy, and the clinic was calm and spotless." },
  { name: "Sample Patient C", city: "Lahore", text: "My child was nervous, but the dentist was gentle and patient throughout." },
];

export const galleryItems = [
  { id: "g1", category: "Teeth Whitening", title: "Whitening consultation", image: "gallery-whitening-1" },
  { id: "g2", category: "Teeth Whitening", title: "Shade planning", image: "gallery-whitening-2" },
  { id: "g3", category: "Smile Makeover", title: "Smile design review", image: "gallery-makeover-1" },
  { id: "g4", category: "Smile Makeover", title: "Cosmetic planning", image: "gallery-makeover-2" },
  { id: "g5", category: "Dental Restoration", title: "Restorative treatment room", image: "gallery-restoration-1" },
  { id: "g6", category: "Dental Restoration", title: "Crown preparation", image: "gallery-restoration-2" },
  { id: "g7", category: "Orthodontic Treatment", title: "Braces appointment", image: "gallery-ortho-1" },
  { id: "g8", category: "Orthodontic Treatment", title: "Aligner review", image: "gallery-ortho-2" },
] as const;
export const galleryCategories = ["Teeth Whitening", "Smile Makeover", "Dental Restoration", "Orthodontic Treatment"] as const;
