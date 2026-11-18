import type { Dentist } from "@/types";

/** FICTIONAL demonstration profiles. Replace every name, credential and biography for a real clinic. */
export const dentists: Dentist[] = [
  {
    slug: "dr-ayesha-rahman", name: "Dr. Ayesha Rahman", specialty: "Cosmetic & Restorative Dentistry",
    qualifications: "BDS, MDS (sample qualification)", experience: "12 years (sample)", image: "dentist-ayesha",
    short: "Focuses on natural-looking restorations and conservative smile design.",
    bio: ["Dr. Ayesha Rahman is a fictional dentist created for this demonstration website. Her sample profile shows how a real clinician's background and approach can be presented.", "Her sample interests include whitening, bonding and crowns planned around a patient's goals and long-term tooth health."],
    consultation: "Initial consultations are typically 30 minutes (sample). Fees are confirmed by the clinic.", focus: ["Smile makeovers", "Crowns & bridges", "Teeth whitening"],
  },
  {
    slug: "dr-hassan-malik", name: "Dr. Hassan Malik", specialty: "Orthodontics",
    qualifications: "BDS, FCPS Orthodontics (sample qualification)", experience: "9 years (sample)", image: "dentist-hassan",
    short: "Treats teens and adults with braces and removable aligners.",
    bio: ["Dr. Hassan Malik is a fictional orthodontist used to illustrate a specialist profile.", "His sample approach explains each stage of treatment clearly, so patients know what to expect between adjustment visits."],
    consultation: "Orthodontic assessments include a discussion of options and timelines (sample).", focus: ["Braces", "Aligners", "Retainers"],
  },
  {
    slug: "dr-sana-tariq", name: "Dr. Sana Tariq", specialty: "Pediatric Dentistry",
    qualifications: "BDS, MSc Paediatric Dentistry (sample qualification)", experience: "8 years (sample)", image: "dentist-sana",
    short: "Gentle, reassuring dental care for children and anxious patients.",
    bio: ["Dr. Sana Tariq is a fictional paediatric dentist created for demonstration purposes.", "Her sample philosophy centres on building a child's confidence with short, friendly visits and clear guidance for parents."],
    consultation: "Family-friendly visits with time for parents' questions (sample).", focus: ["Children's check-ups", "Preventive care", "Fluoride advice"],
  },
  {
    slug: "dr-imran-qureshi", name: "Dr. Imran Qureshi", specialty: "Endodontics & Implants",
    qualifications: "BDS, MDS Endodontics (sample qualification)", experience: "14 years (sample)", image: "dentist-imran",
    short: "Root canal treatment and implant-supported restorations.",
    bio: ["Dr. Imran Qureshi is a fictional specialist profile for this demonstration.", "His sample focus is on saving natural teeth where possible and planning implants carefully when replacement is needed."],
    consultation: "Assessment includes X-ray review and a written treatment outline (sample).", focus: ["Root canal treatment", "Dental implants", "Tooth extraction"],
  },
];

export const dentistBySlug = (slug: string) => dentists.find((d) => d.slug === slug);
export const specialties = Array.from(new Set(dentists.map((d) => d.specialty)));
