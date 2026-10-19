import type { MediaItem } from '../lib/types';

// Foto o video real si hay "src"; si no, queda el placeholder de color.
export default function Media({ item }: { item: MediaItem }) {
  if (!item.src) return null;
  return item.type === 'video' ? (
    <video className="mi" src={item.src} poster={item.poster || undefined} autoPlay muted loop playsInline preload="metadata" />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="mi" src={item.src} alt={item.caption || ''} loading="lazy" />
  );
}

// Ícono de play y barra de progreso, solo para videos sin archivo todavía.
export function Play({ item, bar = true }: { item: MediaItem; bar?: boolean }) {
  if (item.src || item.type !== 'video') return null;
  return (
    <>
      <span className="pl" />
      {bar && <div className="bar"><i /></div>}
    </>
  );
}
