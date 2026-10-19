'use client';
import { useEffect, useRef, useState } from 'react';
import type { Site } from '../lib/types';
import { css } from '../lib/css';
import { fmt } from '../lib/format';

// Número que sube animado cuando entra en pantalla
function Count({ v, as = 'em' }: { v: number; as?: 'b' | 'em' }) {
  const ref = useRef<HTMLElement>(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let t0: number | null = null;
      const f = (ts: number) => {
        if (t0 === null) t0 = ts;
        const p = Math.min((ts - t0) / 1600, 1);
        setT(Math.round(v * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [v]);
  return as === 'b' ? <b ref={ref}>{fmt(t)}</b> : <em ref={ref}>{fmt(t)}</em>;
}

export default function About({ about, socials }: { about: Site['about']; socials: Site['socials'] }) {
  const total = socials.reduce((s, x) => s + x.stats[0].value, 0);
  return (
    <section className="s" id="sobre-mi">
      <h2>Sobre mí</h2>
      <p className="in">{about.intro}</p>
      <div className="ab rv">
        <div className="pt g" style={css({ '--h': 150 })}>
          {about.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="mi" src={about.photo} alt="" />
          ) : about.initials}
        </div>
        <div>
          <dl className="dl">
            {about.details.map((d) => <div key={d.label}><dt>{d.label}</dt><dd>{d.value}</dd></div>)}
          </dl>
          <div className="wk">
            <p>Trabajo</p>
            <div className="tg">{about.work.map((w) => <span key={w}>{w}</span>)}</div>
          </div>
          <div className="tot"><Count as="b" v={total} /><span>seguidores sumando todas sus redes</span></div>
          <div className="so">
            {socials.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
                <b>{s.name}</b>
                <span>{s.handle}</span>
                {s.stats.map((st) => (
                  <span key={st.label} style={{ display: 'contents' }}>
                    <Count v={st.value} />
                    <span className="lb">{st.label}</span>
                  </span>
                ))}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
