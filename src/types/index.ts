export type Faq = { q: string; a: string };
export type ServiceCategory = "General" | "Cosmetic" | "Restorative" | "Specialized";
export type Service = {
  slug: string; title: string; category: ServiceCategory; image: string;
  short: string; overview: string; steps: string[]; benefits: string[]; considerations: string[];
  faqs: Faq[]; related: string[];
};
export type Dentist = {
  slug: string; name: string; specialty: string; qualifications: string; experience: string;
  short: string; bio: string[]; consultation: string; image: string; focus: string[];
};
export type Post = {
  slug: string; title: string; category: string; date: string; excerpt: string; image: string;
  sections: { h: string; p: string[] }[];
};
