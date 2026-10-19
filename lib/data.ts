// Los JSON de /data tipados. Si cambiás la estructura, actualizá lib/types.ts.
import siteJson from '../data/site.json';
import cloudJson from '../data/cloud.json';
import heroJson from '../data/hero-images.json';
import sectionsJson from '../data/sections.json';
import travelJson from '../data/travel.json';
import type { CloudItem, MediaItem, Section, Site, TravelData } from './types';

export const site = siteJson as Site;
export const cloud = cloudJson as CloudItem[];
export const heroImages = heroJson as MediaItem[];
export const sections = sectionsJson as Section[];
export const travel = travelJson as TravelData;
