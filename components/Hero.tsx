'use client';
import { useEffect, useRef } from 'react';
import type { CloudItem, MediaItem } from '../lib/types';
import { css } from '../lib/css';
import Media, { Play } from './Media';
import { useLightbox } from './Lightbox';

interface Props { name: string; tagline: string; cloud: CloudItem[]; pics: MediaItem[] }

export default function Hero({ name, tagline, cloud, pics }: Props) {
  const open = useLightbox();
  const stage = useRef<HTMLElement>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const pis = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef({ tx: 0, ty: 0 });

  useEffect(() => {
    let cx = 0, cy = 0, raf = 0;
    const p = pos.current;
    const loop = () => {
      cx += (p.tx - cx) * 0.06;
      cy += (p.ty - cy) * 0.06;
      tiles.current.forEach((b, i) => {
        if (b) b.style.transform = `translate(${-cx * (cloud[i].w / 10) * 60}px,${-cy * (cloud[i].w / 10) * 60}px)`;
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    const sc = () => pis.current.forEach((e) => {
      if (!e || !e.parentElement) return;
      const r = e.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) e.style.transform = `translateY(${r.top * -0.1}px) scale(1.04)`;
    });
    addEventListener('scroll', sc, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', sc); };
  }, [cloud]);

  const move = (x: number, y: number) => {
    const s = stage.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    pos.current.tx = (x - r.left) / r.width - 0.5;
    pos.current.ty = (y - r.top) / r.height - 0.5;
    s.style.setProperty('--mx', x - r.left + 'px');
    s.style.setProperty('--my', y - r.top + 'px');
  };
  const reset = () => { pos.current.tx = pos.current.ty = 0; };

  const cl: MediaItem[] = cloud.map((c) => ({ ...c, caption: c.label }));
  const pl: MediaItem[] = pics.map((c) => ({ ...c, aspect: 16 / 9 }));
  const [first, ...rest] = name.split(' ');

  return (
    <div className="pinwrap">
      <div className="cont">
        <header className="stage" ref={stage} onMouseMove={(e) => move(e.clientX, e.clientY)} onMouseLeave={reset} onTouchMove={(e) => move(e.touches[0].clientX, e.touches[0].clientY)} onTouchEnd={reset}>
          <i className="bl" style={css({ left: '-6%', top: '10%', width: '34vw', height: '34vw' })} />
          <i className="bl" style={css({ right: '-8%', bottom: '-10%', width: '30vw', height: '30vw', '--c': '#9cc0d6', animationDelay: '-6s' })} />
          {cloud.map((t, i) => {
            const w = t.w * 1.6;
            return (
              <button
                key={i}
                ref={(el) => { tiles.current[i] = el; }}
                className="t"
                aria-label={`${t.type === 'video' ? 'Ver video' : 'Ver foto'} ${i + 1}`}
                onClick={() => open(cl, i)}
                style={css({ left: t.x + '%', top: t.y + '%', width: `calc(var(--u)*${w})`, height: `calc(var(--u)*${w * t.ratio})`, margin: `calc(var(--u)*${(-w / 2) * t.ratio}) 0 0 calc(var(--u)*${-w / 2})`, '--d': `-${i * 1.3}s`, '--i': i })}
              >
                <span className="m g" data-k={t.type === 'video' ? 'Video' : 'Foto'} style={css({ '--h': t.hue })}>
                  <Media item={t} />
                  <Play item={t} bar={false} />
                </span>
              </button>
            );
          })}
          <span className="hint"><span className="hm">Pasá el mouse y tocá</span><span className="ht">Tocá</span> cualquier pieza para verla en grande</span>
        </header>
        <div className="pics">
          {pl.map((p, i) => (
            <div key={i} className="pic" onClick={() => open(pl, i)}>
              <div className="pi g" ref={(el) => { pis.current[i] = el; }} style={css({ '--h': p.hue })}>
                <i className="o1" /><i className="o2" />
                <Media item={p} />
              </div>
              <Play item={p} />
              <span className="pc">{p.caption || `${p.type === 'video' ? 'Video' : 'Foto'} horizontal, ${i + 1} de ${pl.length}`}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero">
        <h1><strong className="w">{first}</strong> <span className="w">{rest.join(' ')}</span></h1>
        <p>{tagline}</p>
      </div>
    </div>
  );
}
