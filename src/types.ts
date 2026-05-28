export type RelationType = "Profesional / Atasan" | "Teman / Kerabat" | "Keluarga / Orang Tua";

export interface ExcuseLevel {
  level: number;
  label: string;
  shortDesc: string;
  detailDesc: string;
}

export interface RejectionVariant {
  id: string;
  variantName: string; // Varian A, B, C
  toneBadge: string; // Formal, Hangat, Tegas Santun
  generatedText: string;
  counterOffer: string;
}

export type InputMode = "text" | "screenshot" | "voice";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarText: string;
  quote: string;
  avatarColor: string;
}
