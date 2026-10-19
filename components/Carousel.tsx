'use client';
import { useRef, useState } from 'react';
import type { MediaItem } from '../lib/types';
import { css } from '../lib/css';
import Media, { Play } from './Media';
import { useLightbox } from './Lightbox';

export default function Carousel({ list, photo }: { list: MediaItem[]; photo: boolean }) {
  const open = useLightbox();
  const n = list.length;
  const [a, setA] = useState(Math.min(1, n - 1));
  const x0 = useRef<number | null>(null);
  const moved = useRef(false);
  const go = (k: number) => setA(Math.max(0, Math.min(n - 1, k)));

  return (
    <div
      className="cv"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(a + 1); if (e.key === 'ArrowLeft') go(a - 1); }}
      onPointerDown={(e) => { x0.current = e.clientX; moved.current = false; }}
      onPointerUp={(e) => {
        if (x0.current !== null && Math.abs(e.clientX - x0.current) > 40) {
          moved.current = true;
          go(a + (e.clientX < x0.current ? 1 : -1));
          setTimeout(() => { moved.current = false; }, 50);
        }
        x0.current = null;
      }}
    >
      <div className="trk">
        {list.map((m, i) => {
          const o = i - a, ab = Math.abs(o);
          return (
            <div
              key={i}
              className={'sl g' + (photo ? ' ph' : '')}
              style={css({ '--h': m.hue, zIndex: 10 - ab, opacity: ab > 2 ? 0 : 1 - ab * 0.2, pointerEvents: ab > 2 ? 'none' : 'auto', transform: `translateX(calc(-50% + ${o * 54}%)) scale(${1 - ab * 0.2})`, filter: ab ? `blur(${ab * 1.4}px) saturate(.75)` : 'none' })}
              onClick={() => { if (moved.current) return; if (i === a) open(list, i); else go(i); }}
            >
              <Media item={m} />
              <Play item={m} />
            </div>
          );
        })}
      </div>
      <div className="ct">
        <button className="pv" aria-label="Anterior" onClick={() => go(a - 1)}>‹</button>
        <span className="dt">{list.map((_, i) => <i key={i} className={i === a ? 'on' : ''} />)}</span>
        <button className="nx" aria-label="Siguiente" onClick={() => go(a + 1)}>›</button>
      </div>
    </div>
  );
}
