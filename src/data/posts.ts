import type { Post } from "@/types";

/** General educational content, not personal medical advice. Have a qualified dentist review before publishing for a real clinic. */
export const posts: Post[] = [
  {
    slug: "10-essential-tips-for-healthy-teeth", title: "10 Essential Tips for Healthy Teeth", category: "Prevention", date: "2026-01-12", image: "blog-tips",
    excerpt: "Simple daily habits that help protect your teeth and gums.",
    sections: [
      { h: "Build a daily routine", p: ["Brush twice a day for two minutes with a fluoride toothpaste, and clean between your teeth once a day with floss or interdental brushes. Use a soft brush and gentle pressure, replacing it every three months or when the bristles fray."] },
      { h: "Watch what and how often you eat", p: ["It is the frequency of sugar, not only the amount, that feeds decay. Try to limit sugary snacks and drinks to mealtimes, and choose water between meals."] },
      { h: "Look after the basics", p: ["Do not smoke or chew tobacco, protect your teeth during contact sports, avoid using teeth as tools, and replace worn toothbrushes. Visit your dentist for regular check-ups, and book sooner if you notice pain, bleeding gums or a loose tooth."] },
    ],
  },
  {
    slug: "importance-of-regular-dental-checkups", title: "Importance of Regular Dental Checkups", category: "Prevention", date: "2026-01-26", image: "blog-checkups",
    excerpt: "Why routine visits help catch problems early.",
    sections: [
      { h: "What happens at a check-up", p: ["Your dentist reviews your history, examines teeth, gums and soft tissues and may take X-rays if needed. You will also get advice tailored to your mouth."] },
      { h: "Why early detection matters", p: ["Decay and gum disease often cause no pain at first. Finding them early usually means simpler, less invasive treatment."] },
      { h: "How often should you go?", p: ["Many people are advised to attend every six to twelve months, but the right interval depends on your risk. Ask your dentist what suits you."] },
    ],
  },
  {
    slug: "understanding-root-canal-treatment", title: "Understanding Root Canal Treatment", category: "Treatments", date: "2026-02-09", image: "blog-rootcanal",
    excerpt: "What a root canal is, why it is done and what to expect.",
    sections: [
      { h: "What is a root canal?", p: ["Inside each tooth is soft tissue called pulp. If it becomes infected or inflamed, root canal treatment removes it, cleans the space and seals the tooth."] },
      { h: "Signs you may need one", p: ["Warning signs can include lingering pain to hot or cold, pain on biting, swelling near the gum or a darkened tooth. Some infections cause no symptoms, so only an examination can confirm the cause."] },
      { h: "What to expect", p: ["Treatment uses local anaesthesia. Mild soreness afterwards is common. A crown is often recommended to protect the tooth. If you have facial swelling or severe pain, seek dental care promptly."] },
    ],
  },
  {
    slug: "benefits-of-professional-teeth-cleaning", title: "Benefits of Professional Teeth Cleaning", category: "Prevention", date: "2026-02-23", image: "blog-cleaning",
    excerpt: "How scaling and polishing support gum health.",
    sections: [
      { h: "Plaque, tartar and gums", p: ["Plaque that is not removed can harden into tartar, which brushing cannot remove. Tartar irritates gums and can contribute to gum disease."] },
      { h: "What a cleaning involves", p: ["A dental professional removes deposits above and just below the gumline and polishes the teeth. It is usually comfortable, though sensitive gums may feel tender."] },
      { h: "Making it count", p: ["Keep up daily brushing and interdental cleaning between visits. Your dentist can suggest how often you need professional cleaning."] },
    ],
  },
  {
    slug: "what-you-should-know-about-dental-implants", title: "What You Should Know About Dental Implants", category: "Treatments", date: "2026-03-09", image: "blog-implants",
    excerpt: "An overview of implants, suitability and care.",
    sections: [
      { h: "How implants work", p: ["An implant is a small post placed in the jaw that supports a crown, bridge or denture. Healing takes time, so treatment is usually spread over several months."] },
      { h: "Who may be suitable", p: ["Suitability depends on gum health, bone volume and general health. Smoking and uncontrolled diabetes can affect outcomes, so your dentist will assess your case."] },
      { h: "Caring for implants", p: ["Implants need the same careful cleaning and regular reviews as natural teeth. No treatment can be guaranteed to last forever."] },
    ],
  },
  {
    slug: "childrens-dental-care-guide", title: "Children's Dental Care Guide", category: "Family", date: "2026-03-23", image: "blog-children",
    excerpt: "Healthy habits from the first tooth onwards.",
    sections: [
      { h: "Start early", p: ["Begin cleaning as soon as the first tooth appears, using a tiny smear of fluoride toothpaste as advised by your dentist. A first dental visit is often recommended around the first birthday."] },
      { h: "Diet and habits", p: ["Limit sugary drinks and snacks, avoid putting a baby to bed with a bottle of sweetened liquid, and help children brush until they can do it well themselves."] },
      { h: "Making visits positive", p: ["Speak about dental visits in simple, calm language and choose a dentist who is comfortable with children. Baby teeth matter, even though they are replaced."] },
    ],
  },
  {
    slug: "causes-of-tooth-sensitivity", title: "Causes of Tooth Sensitivity", category: "Oral Health", date: "2026-04-06", image: "blog-sensitivity",
    excerpt: "Why teeth can react to hot, cold or sweet foods.",
    sections: [
      { h: "Common causes", p: ["Sensitivity can result from worn enamel, receding gums, tooth decay, a cracked tooth or recent dental treatment. Brushing too hard and acidic foods can contribute."] },
      { h: "Things that may help", p: ["A soft brush, gentle technique and toothpaste made for sensitive teeth can help some people. These measures do not treat an underlying problem."] },
      { h: "When to see a dentist", p: ["See a dentist if sensitivity is severe, lasts more than a few weeks or affects only one tooth, because it can signal a problem that needs treatment."] },
    ],
  },
  {
    slug: "importance-of-oral-hygiene", title: "Importance of Oral Hygiene", category: "Oral Health", date: "2026-04-20", image: "blog-hygiene",
    excerpt: "How a clean mouth supports your general wellbeing.",
    sections: [
      { h: "More than fresh breath", p: ["Good oral hygiene helps prevent cavities and gum disease, which are common causes of tooth loss in adults."] },
      { h: "The core habits", p: ["Brush twice daily, clean between teeth, limit sugary snacks, avoid tobacco and attend regular check-ups. Consider a tongue cleaner if your dentist recommends it."] },
      { h: "Link with overall health", p: ["Gum disease has been associated with some general health conditions, such as diabetes. If you have a medical condition, tell your dentist so your care can be planned safely."] },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const postCategories = Array.from(new Set(posts.map((p) => p.category)));
