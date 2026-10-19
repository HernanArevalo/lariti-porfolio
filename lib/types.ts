export type MediaType = 'photo' | 'video';

/** Cualquier pieza que se puede mostrar o ampliar. Sin `src` se ve el placeholder de color. */
export interface MediaItem {
  type: MediaType;
  hue: number;
  src?: string;
  poster?: string;
  caption?: string;
  aspect?: number;
}

export interface CloudItem extends MediaItem {
  x: number; // posición horizontal en %
  y: number; // posición vertical en %
  w: number; // tamaño relativo
  ratio: number; // alto / ancho
  label?: string;
}

export interface ShowcaseMedia { src?: string; poster?: string; hue?: number }

export interface ShowcaseItem {
  brand: string;
  title: string;
  description: string;
  tags: string[];
  type: MediaType;
  hue: number;
  media?: ShowcaseMedia[];
}

export interface Section { id: string; title: string; intro: string; items: ShowcaseItem[] }

export interface TravelItem extends MediaItem {
  category: string;
  destination: string;
  title: string;
  description: string;
}

export interface TravelData { title: string; intro: string; categories: string[]; items: TravelItem[] }

export interface Social {
  name: string;
  handle: string;
  url: string;
  stats: { value: number; label: string }[];
}

export interface Site {
  name: string;
  brand: string;
  title: string;
  tagline: string;
  email: string;
  marquee: string[];
  nav: { id: string; label: string }[];
  about: {
    intro: string;
    initials: string;
    photo: string;
    details: { label: string; value: string }[];
    work: string[];
  };
  socials: Social[];
  contact: { title: string; text: string; button: string };
}
